//  Canvas Setup
const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
let drawing = false;

canvas.addEventListener("mousedown", () => drawing = true);
canvas.addEventListener("mouseup", () => {
  drawing = false;
  ctx.beginPath();
});
canvas.addEventListener("mousemove", draw);

function draw(e) {
  if (!drawing) return;
  ctx.strokeStyle = document.getElementById("colorPicker").value;
  ctx.lineWidth = document.getElementById("brushSize").value;
  ctx.lineCap = "round";

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

document.getElementById("clearBtn").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

//  Network Information API
const netInfo = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
const networkStatus = document.getElementById("networkStatus");

function updateNetworkStatus() {
  if (!netInfo) {
    networkStatus.textContent = "Network information not available.";
    return;
  }

  const speed = netInfo.effectiveType;
  networkStatus.textContent = `Connection: ${speed}`;

  if (speed === "slow-2g" || speed === "2g") {
    alert("Slow connection detected! Online features disabled.");
  }
}

if (netInfo) {
  netInfo.addEventListener("change", updateNetworkStatus);
  updateNetworkStatus();
}

//  Intersection Observer API 
const tipsSection = document.getElementById("drawingTips2");
const dimbtn=document.getElementById("dim");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");//visible is class i am applying
        observer.unobserve(entry.target); 
      }
    });
  },
  {
    threshold: 1
  }
);



dimbtn.addEventListener("click",()=>{
    if(dimbtn){
        observer.observe(tipsSection);
        // alert("Now observing the second tips section!");
    }
});