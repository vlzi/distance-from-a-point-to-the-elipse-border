//this snippet uses desmos graph calculator, but you can use abpq function without it. (even out of the browser)
const left = document.createElement("div");
  left.style.height = "600px";
  const calc = Desmos.GraphingCalculator(left);
  calc.setExpression({ id: "a", latex: "a=5" });
  calc.setExpression({ id: "b", latex: "b=3" });
  calc.setExpression({ id: "p", latex: "p=(1,5)" });
  calc.setExpression({ id: "elipse", latex: "(x/a)^2+(y/b)^2=1" });
  const ah = calc.HelperExpression({ latex: "a" }), bh = calc.HelperExpression({ latex: "b" });
  const ph = calc.HelperExpression({ latex: "p.x" }), qh = calc.HelperExpression({ latex: "p.y" });
  function cmp (alpha, c, t) {
      return Math.sign(Math.sin(t - alpha) - c * Math.sin(2 * t));
  }
  function bins(alpha, c, inter, b, e) {
      const bc = cmp(alpha, c, b), ec = cmp(alpha, c, e);
      if (bc * ec > 0) return;
      if (bc === 0) return inter.push(b);
      if (ec === 0) return inter.push(e);
      for (let i = 0; i < 50; i++) {
          const m = (b + e) / 2, mc = cmp(alpha, c, m);
          if (mc === 0) return inter.push(m);
          else if (mc === bc) b = m;
          else e = m;
      }
      inter.push(b);
  }
  function abpq(a, b, p, q) {
      if (p == 0 && q == 0) {
          if (a > b) return Math.PI / 2;
          else return 0;
      }
      const alpha = Math.atan2(b * q, a * p), c = (a**2 - b**2) / 2 / Math.sqrt((a * p) ** 2 + (b * q) ** 2);
      const inter = [];
      if (Math.abs(c) > 1) {
          bins(alpha, c, inter, 0, Math.PI*(1/4));
          bins(alpha, c, inter, Math.PI*(1/4), Math.PI*(3/4));
          bins(alpha, c, inter, Math.PI*(3/4), Math.PI*(5/4));
          bins(alpha, c, inter, Math.PI*(5/4), Math.PI*(7/4));
          bins(alpha, c, inter, Math.PI*(7/4), Math.PI*2);
      } else {
          bins(alpha, c, inter, alpha, alpha + Math.PI*(1/2));
          bins(alpha, c, inter, alpha + Math.PI*(1/2), alpha + Math.PI*(3/2));
          bins(alpha, c, inter, alpha + Math.PI*(3/2), alpha + Math.PI*2);
      }
      let mint = 0, mind = Infinity;
      for (let i of inter) {
          const d = (p - a * Math.cos(i)) ** 2 + (q - b * Math.sin(i)) ** 2;
          if (d < mind) {
              mind = d;
              mint = i;
          }
      }
      return mint;
  }
  setInterval(() => {
      const t = abpq(ah.numericValue, bh.numericValue, ph.numericValue,qh.numericValue);
      calc.setExpression({ id: "h", latex: `(a*\\cos(${t}), b*\\sin(${t}))`});
  }, 100);



  window.onload = () => {document.body.appendChild(left);};
