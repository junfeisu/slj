<template>
  <slj-nav></slj-nav>
  <div class="index">
    <canvas id="cv" width="150" height="150"></canvas>
  </div> 
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {}
    },
    methods: {
      abc () {
        res.user.put_password({
          user_id: 2,
          password: '123456',
          ensurepassword: '12345'
        })
          .then(data => {
            console.log(data)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    ready () {
      let canvas = document.getElementById('cv')
      if (canvas.getContext) {
        let ctx = canvas.getContext('2d')
        ctx.fillStyle = 'red'
        ctx.beginPath()
        ctx.moveTo(75, 50)
        ctx.bezierCurveTo(75, 37, 70, 25, 50, 25)
        ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5)
        ctx.bezierCurveTo(20, 80, 40, 102, 75, 120)
        ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5)
        ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25)
        ctx.bezierCurveTo(85, 25, 75, 37, 75, 40)
        ctx.fill()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .index {
    width: 10rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>