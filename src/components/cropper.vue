<template>
  <div class="cropper">
    <div class="cropper-wrapper">
      <div class="image-wrapper">
        <img :src="src" alt="" id="image">
      </div>
      <div>
        <span>预览效果</span>
        <div class="img-preview">
      </div>
      </div>
    </div>
    <button @click="goConfirmCrop">确认裁剪</button>
    <span style="color: #999;font-size: 12px">控制台输出base64编码</span>
  </div>
</template>

<script>
  import Cropper from 'cropperjs'
  export default {
    name: 'HelloWorld',
    data () {
      return {
        src:"http://t00img.yangkeduo.com/goods/images/2018-11-06/2a5302f34eade9930637cea4c9173331.jpeg",
        cropper:{},
        base64_code:''
      }
    },
    mounted(){
      this.$nextTick(()=>{
        this.initCrop();
      })
    },
    methods:{
      initCrop(){
        let self = this;
        let image = document.getElementById('image');
        this.cropper = new Cropper(image, {
          aspectRatio: 1,
          autoCropArea:0.9,
          minContainerWidth:200,
          minContainerHeight:200,
          viewMode: 3,
          background:false,
          zoomable:false,
          preview:'.img-preview',
          crop(event){},
          ready() {
            self.croppable = false;
          }
        });
      },
      //初始化这个裁剪框
      goConfirmCrop(){
        let roundedCanvas=this.getRoundedCanvas(this.cropper.getCroppedCanvas());
        this.base64_code=roundedCanvas.toDataURL(('image/jpeg'));
        console.log(this.base64_code);
      },
      getRoundedCanvas (sourceCanvas){
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');
        let width = sourceCanvas.width;
        let height = sourceCanvas.height;
        canvas.width = width;
        canvas.height = height;
        context.imageSmoothingEnabled = true;
        context.drawImage(sourceCanvas, 0, 0, width, height);
        context.globalCompositeOperation = 'destination-in';
        context.beginPath();
        context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
        context.fill();
        return canvas;
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  .cropper
    width 800px
    height 400px
    margin 40px auto
  .cropper-wrapper
    display flex
  .image-wrapper
    width 400px
    height 400px
    overflow hidden
    margin-right 40px
    img
      max-width 100%
  button
    margin-top 20px
    margin-right 10px
  .img-preview
    width 200px
    height 200px
    overflow hidden
</style>
