<script lang='ts' setup>
import { ref, computed, watch } from 'vue'
import { useElementSize } from '@vueuse/core'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

const prop = defineProps<{
  // img: string
  aspectRatio?: number
  title?: string
  maxHeight?: number,
  maxWidth?: number
}>()
const emit = defineEmits(['update:modelValue', 'submit'])

const value = defineModel<boolean>()

const img = ref()
const upimage = ref<HTMLInputElement>()
const container = ref()
const preview = ref()

let canvas = ref()
useElementSize(canvas)


let options = ref<Cropper.Options<HTMLImageElement>>({
  aspectRatio: prop.aspectRatio || 16 / 9,
  preview: '.cropper-preview',
  minCropBoxWidth: 100,
  minCropBoxHeight: 100,
  viewMode: 1,
  autoCropArea: 1,
})

let cr: Cropper

function uploadImg(event: Event) {
  let file = (event.target as HTMLInputElement).files![0]
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = e => {
    img.value = e.target!.result
    // const image = new Image();
    // image.src = img.value;

    if (!cr) {
      cr = new Cropper(container.value, options.value)
      // console.log(cr);
    }
  }
}
watch(img, () => {
  cr.replace(img.value)
})

function reset() {
  cr.reset()
}
let x = 1
function scaleX() {
  x = x * -1
  cr.scaleX(x)
}
function rotate() {
  cr.rotate(45)
}
function relat() {
  if (options.value.viewMode === 1) {
    options.value.viewMode = 0
  } else {
    options.value.viewMode = 1
  }
  cr.destroy()
  cr = new Cropper(container.value!, options.value).replace(img.value)
}

function submit() {
  let urlData = cr.getCroppedCanvas({
    maxWidth: prop.maxWidth || 500,
    maxHeight: prop.maxHeight || 500,
  }).toDataURL()
  emit('submit', urlData)
  value.value = false
}

</script>
<template>
  <el-dialog v-model="value" draggable append-to-body width="670" :close-on-click-modal="false">
    <template #header>
      <input type="file" name="upimage" ref="upimage" accept="image/*" @change="uploadImg($event)" hidden>
      <el-button link @click="upimage?.click()">
        {{ title }}
        <el-icon>
          <el-icon-upload />
        </el-icon>
      </el-button>
    </template>
    <div class="cropper">
      <el-row>
        <el-col :span="16">
          <div class="cropper-canvas" ref="canvas">
            <img v-show="img" :src="img" ref="container" />
            <div v-if="!img" class="up-image-btn" @click="upimage?.click()">
              <el-icon :size="40">
                <el-icon-plus></el-icon-plus>
              </el-icon>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="preview-box-parcel">
            <p>图片预览</p>
            <div class="cropper-preview" ref="preview"> </div>
          </div>
        </el-col>
        <el-col :span="24">
          <div>
            <el-button link @click="reset">重置</el-button>
            <el-button link @click="rotate">旋转</el-button>
            <el-button link @click="scaleX">水平翻转</el-button>
            <el-button link @click="relat">
              {{ options.viewMode == 0 ? "固定范围" : "取消固定范围" }}
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <template #footer>
      <el-button type="primary" @click="submit">确定</el-button>
    </template>
  </el-dialog>
</template>
<script lang='ts'>

export default {
  name: 'Cropped',
}
</script>
<style lang='less' scoped>
.title {
  display: flex;
  align-items: center;
}

.cropper {
  position: relative;
  padding: 5px 0;

  .cropper-canvas {
    position: relative;
    width: 100%;
    height: 100%;
    border: solid 1px #ddd;

    img {
      max-width: 100%;
      max-height: 100%;
    }

    .cover-upimage {
      width: 30px;
      height: 30px;
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #d9d9d9;
    }

    .up-image-btn {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }

  .preview-box-parcel {
    display: inline-block;
    width: 228px;
    height: 200px;
    position: relative;
    right: 0;
    padding: 4px 14px;

    .cropper-preview {
      width: 100%;
      height: 100%;
      margin-top: 10px;
      border: solid 1px #ddd;
      overflow: hidden;
      background-color: #fff;
    }
  }

  .cropper-option {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>