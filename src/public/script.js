$("#button-navbar").click(function() {
  if($("#button-navbar").hasClass("fa-bars")){
    $("#button-navbar").removeClass("fa-bars");
    $("#button-navbar").addClass("fa-times");
  }else{
    $("#button-navbar").removeClass("fa-times");
    $("#button-navbar").addClass("fa-bars");
  }
});
