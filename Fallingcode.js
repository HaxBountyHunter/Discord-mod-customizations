(function injectMatrix(columns = 36, digits = 18, speed = 1) {
  if (document.getElementById('matrix-rain')) return console.log('matrix-rain already present');

  const container = document.createElement('div');
  container.id = 'matrix-rain';
  document.body.appendChild(container);

  function rndBit(){ return Math.random() < 0.5 ? '0' : '1'; }
  function rand(min, max){ return Math.random()*(max-min)+min; }

  for (let i = 0; i < columns; i++){
    const col = document.createElement('div');
    col.className = 'matrix-column';
    const left = (i/columns)*100 + rand(-1.5,1.5);
    col.style.left = Math.max(0, Math.min(100,left)) + '%';
    for (let d = 0; d < digits; d++){
      const sp = document.createElement('span');
      sp.className = 'digit';
      sp.textContent = rndBit();
      const dur = rand(3.0, 10.0) * speed;
      sp.style.animationDuration = dur + 's';
      sp.style.animationDelay = -rand(0, dur) + 's';
      sp.style.opacity = rand(0.18, 0.9).toFixed(2);
      if (Math.random() < 0.12) sp.classList.add('leader');
      col.appendChild(sp);
    }
    container.appendChild(col);
  }

  // small flicker loop to randomize bits occasionally
  setInterval(()=>{
    const all = container.querySelectorAll('.digit');
    for (let i = 0; i < Math.max(1, Math.floor(all.length*0.005)); i++){
      const idx = Math.floor(Math.random()*all.length);
      all[idx].textContent = Math.random() < 0.5 ? '0' : '1';
      if (Math.random() < 0.02) all[idx].classList.toggle('leader');
    }
  }, 150);
  console.log('Injected matrix-rain with', columns, 'columns');
})();
