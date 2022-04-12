var c=()=>{
  // 获取设备宽度
  let base = 16;
  let w = document.documentElement.clientWidth;
  let n = (base*(w/1200))>40 ? 40 : (base*(w/1200));  // base是基准大小
  n = (n > 12) ? (n + "px") : (12 + "px");
  document.documentElement.style.fontSize=n;    // 设置rem
}
// 加载或改变尺寸时加载c
window.addEventListener("load", c);
window.addEventListener("resize", c);