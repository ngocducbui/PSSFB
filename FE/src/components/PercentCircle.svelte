<script>
    export let p = 0
</script>

<div class="flex-wrapper justify-between pt-10">
    
    
   
  
    <div class="single-chart">
      <svg viewBox="0 0 36 36" class="circular-chart blue">
        <path class="circle-bg"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path class="circle"
          stroke-dasharray="{p}, 100"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text x="18" y="20.35" class="percentage">{p}%</text>
      </svg>
    </div>
  </div>

<style>
	.flex-wrapper {
  display: flex;
  flex-flow: row nowrap;
}

.single-chart {
  width: 100%;
  justify-content: space-around ;
}

.circular-chart {
  display: block;
  margin: 10px auto;
  max-width: 80%;
  max-height: 250px;
}

.circle-bg {
  fill: none;
  stroke: gray;
  stroke-width: 1.5;
}

.circle {
  fill: none;
  stroke-width: 1;
  stroke-linecap: round;
  animation: progress 1s ease-out forwards;
}

@keyframes progress {
  0% {
    stroke-dasharray: 0 100;
  }
}



.circular-chart.blue .circle {
  stroke: #3c9ee5;
}

.percentage {
  fill: white;
  font-family: sans-serif;
  font-size: 0.5em;
  text-anchor: middle;
}

</style>
