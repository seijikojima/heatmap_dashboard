<template>
    <div id="dashboard">
        <div class="form_add_new_item">
          <!-- <div>
            <input v-on:click="get_only_checked_items()" type="checkbox" v-model="onlyCheckFlag">
            {{onlyCheckFlag}}
          </div> -->


        </div>

      
        <div class="table_frame">
                  
            <table>
                <tr>
                    <th>id</th>
                    <th>画像名</th>
                    <th>画像</th>
                    <th>ヒートマップ</th>
                    <th>ラベル</th>
                    <th>NG確率</th>
                     <th>チェック</th>
                </tr>
                <tr v-bind:key="item.id" v-for="(item) in items">
                    <td>{{item.id}}</td>
                    <td>{{item.img_name}}</td>
                    <td v-on:click="show_image_on_modal('/org/'+item.img_name)"><img v-bind:src="'https://api.inspection.seijikojima.com/org/' + item.img_name" height="100px"></td>
                    <td v-on:click="show_image_on_modal('/cam/'+item.img_name)"><img v-bind:src="'https://api.inspection.seijikojima.com/cam/' + item.img_name" height="100px"></td>
                    <td v-if="item.groundtruth==1"><button class="ng_button" v-on:click="submit_change_groundtruth_propaty(item)">NG</button></td>
                    <td v-else><button class="ok_button" v-on:click="submit_change_groundtruth_propaty(item)">OK</button></td>
                    

                    <td>{{item.ng_prob}}</td>
                    <td><input v-on:click="submit_change_check_propaty(item)" type="checkbox" v-model="item.check"></td>

                </tr>
            </table>
        </div>


        <!-- modal for change item -->
        <modal :val="showImgName"
               :width="400"
               :height="400"
               name="show-image">

          <div class="modal_window">    
            <!-- <h3>拡大画像</h3> -->
            <img v-bind:src="'https://api.inspection.seijikojima.com'  + showImgName" height="380px">
          </div>
        </modal>


    </div>
</template>

<script>

// var endpoint_base = "http://localhost:80"
var endpoint_base = "https://api.inspection.seijikojima.com"
// var endpoint_base = process.env.VUE_APP_ENDPOINT
export default {
    name : "dashboard",
    components: {
        // TodoItem
    },
    data(){
        return {
            endpoinrt : "",
            items : [],
            keyWord : "",
            showImgName : "",
            deleteID : "",
        }
    },
    mounted(){
        this.get_all_items();
        console.log("aaaa",endpoint_base)
    },
    methods: {
    
    // get all items
    get_all_items : function(){
      console.log("get all books")
      this.axios.get(endpoint_base + '/items')
      .then(response => {
        this.items = response.data
      })
    },
    get_only_checked_items : function(){
      console.log("get all books")
      this.axios.get(endpoint_base + '/checked_items')
      .then(response => {
        this.items = response.data
      })
    },
    show_image_on_modal : function (img_name){
      this.showImgName = img_name
      console.log(img_name)
      this.on_modal_show_image()
      console.log(img_name)
    },
    // change groundtruth propaty
    submit_change_groundtruth_propaty : function(item){
      if(item.groundtruth === 0) item.groundtruth = 1
      else item.groundtruth = 0
      var payload = { "id" : item.id, "groundtruth" : item.groundtruth }
  
      this.axios.put( endpoint_base + '/items/' , { payload } ) 
        .then(response => {
          console.log(response);
          // this.items = response.data
          this.get_all_items(); // 再取得
      })
    },
    submit_change_check_propaty : function(item){
      
      if(item.check === 0) item.check = 1
      else item.check = 0
      var payload = { "id" : item.id, "check" : item.check }
  
      this.axios.put( endpoint_base + '/items/' , { payload } ) 
        .then(response => {
          console.log(response);
          // this.items = response.data
          this.get_all_items(); // 再取得
      })
    },
    // modal function for add new tem
    on_modal_show_image : function() {
      this.$modal.show('show-image');
    },
  }
}
</script>

<style scoped>
.form_add_new_item{
    margin : 50px auto 0 auto;
    padding : 5px;
    /* border : solid 1px #ddd; */
    border-radius : 5px;
    width : 82%;
}
input, button {
  margin : 5px;
}
.button_add_new_item{
  background : #666;
  color : white;
  padding : 2px 5px 3px 5px;
  border-radius : 5px;
}
.submit_button{
  background : #444;
  color : white;
  padding : 2px 5px 3px 5px;
  border-radius : 5px;
}
.table_frame {
    margin : 10px auto;
    padding : 5px;
    /* border : solid 1px #ddd; */
    border-radius : 5px;
    width : 90%;
}
.ng_button{
    background : rgb(181, 24, 24);
    color : white;
    padding : 5px;
    /* width : 20px; */
    border : solid 0;
    border-radius : 10px;
}
.ok_button{
    background : #666;
    color : white;
    padding : 5px;
    /* width : 20px; */
    border : solid 0;
    border-radius : 10px;
}
.delete_button{
    background : #fd0006;
    color : white;
    width : 15px;
    border : solid 0;
    border-radius : 10px;
}
table {
  border-collapse: collapse;
  margin: 0 auto;
  padding: 0;
  width: 90%;
  box-shadow: 0 0 15px -6px #00000073;
}
table tr {
  background-color: #fff;
}
table th,table td {
  padding: .35em 1em;
  border-bottom: 1px solid #eee;
}
table th {
    text-align : left;
}
.modal_window {
  height : 400px;
  padding : 10px;
  color : #000;
  background : #fff;
}
</style>