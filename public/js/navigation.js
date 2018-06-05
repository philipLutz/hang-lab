function toggleHamburger(){
  var line1 = document.getElementById('line1');
  var line2 = document.getElementById('line2');
  var line3 = document.getElementById('line3');
  var mobile = document.getElementById('mobile-menu');
  if(mobile.style.display == "none")
    {
      line1.style.transform = "rotate(45deg)";
      line1.style.top = "45%";

      line2.style.transform = "rotate(-45deg)";
      line2.style.top = "45%";

      line3.style.transform = "rotate(-45deg)";
      line3.style.top = "45%";
      mobile.style.display = "block";
    }
  else
    {
      line1.style.transform = "rotate(0deg)";
      line1.style.top = "20%";

      line2.style.transform = "rotate(0deg)";
      line2.style.top = "45%";

      line3.style.transform = "rotate(0deg)";
      line3.style.top = "70%";
      mobile.style.display = "none";
    }
}