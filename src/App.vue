<template>
  <div className="content">
    <div id="stencil" className="sidebar" />
    <div className="panel">
      <!-- <div className="toolbar">Toolbar</div> -->
      <div id="container" className="x6-graph" />
    </div>  
  </div>
</template>

<script>
import FlowGraph from "./graph/index"

const resizeFn = () => {
  const width = document.body.offsetWidth - 291
  // const height = document.body.offsetHeight - 40
  const height = document.body.offsetHeight
  FlowGraph.graph.resize(width, height)  
} 

export default {
  name: 'App',
  data() {
    return {
      ModalText: 'Content of the modal',
      visible: true,
      confirmLoading: false,
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.visible = false;
    },
  },
  mounted() {    
    FlowGraph.init()                
    resizeFn()
    window.addEventListener('resize', resizeFn)
  },
  unmounted() {
    window.removeEventListener('resize', resizeFn)
  }
}

</script>

<style>
  body {
    margin: 0px;
  }
  #app {
    width: 100vw;
    height: 100vh;
  }
  .content {
    display: flex;
    height: 100%;    
  }
  .sidebar {
    position: relative;
    width: 290px;
    height: 100%;
    border-right: 1px solid rgba(0, 0, 0, 0.08);
  }    
  .panel {
    height: 100%;
  }
  .toolbar {
    display: flex;
    align-items: center;
    height: 38px;
    background-color: #f7f9fb;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }
</style>
