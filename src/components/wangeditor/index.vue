<template>
     <div ref="editorDom"></div>
</template>

<script>
import Editor from 'wangeditor'
export default {
    props:{
        isClear:{
            type:Boolean,
            default:false
        },
        value:{
            type:String,
            default:''
        }
    },
    methods:{
        createEditor(){
            this.editor = new Editor(this.$refs.editorDom)
            this.editor.customConfig.onchange = html =>{
                this.$emit("update:content",html)
            }
            this.editor.create()  //创建富文本实例
        },
    },
    mounted(){
        this.createEditor()
    },

    watch:{
        isClear:{
            handler(newValue){
                this.editor.txt.clear()
            }
        },
        value:{
            handler(newValue){
                this.editor.txt.html(newValue)
            }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>

