// If user selecting other in Dream
$('.select-dream').change(function() {
  // console.log($(this).val())
  // console.log(this)
  if ($(this).val() == 'others') {
      $('#other_dream').addClass('d-block')
  } else {
      $('#other_dream').removeClass('d-block')
  }
});
// allow number function
function AllowOnlyNumbers(e) {
  e = (e) ? e : window.event;
  var clipboardData = e.clipboardData ? e.clipboardData : window.clipboardData;
  var key = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
  var str = (e.type && e.type == "paste") ? clipboardData.getData('Text') : String.fromCharCode(key);
  return (/^\d+$/.test(str));
}
// regular saving YES NO then show Monthaly income
$('input[type=radio][name=radio-saving]').change(function() {
  if ($(this).attr("id") == 'yes_save') {
      $('#togglesavemonth').addClass('d-block')
  } else if ($(this).attr("id") == 'no_save') {
      $('#togglesavemonth').removeClass('d-block')
  }
});



// next and previus step

// check Validation for step one
function checkValidationStepOne(){
  let validat = true;
  console.log("test");
  // var count = 0;
          // debugger;
          
  let cname = document.forms["hlvform"]["cname"].value.trim();
  console.log(cname)
  console.log($('#cmError'))
  if (cname == "") {
      document.getElementById('cmError').innerHTML = "Please enter child name.";
      // count++;
      validat = false
  }

  let ageinput = document.forms["hlvform"]["ageinput"].value.trim();
  if(ageinput == 0){
      document.getElementById('ageError').innerHTML = "Please select.";
      validat = false
  }
  let dreamselect = document.forms["hlvform"]["dreamselect"].value.trim();
  if(dreamselect == 0){
      document.getElementById('DreamError').innerHTML = "Please select.";
      validat = false
  }
  // console.log(dreamselect)
  let dream = document.forms["hlvform"]["dream"].value.trim();
  if(dreamselect === 'others'){
      if(dream === ''){
          document.getElementById('odError').innerHTML = "Please enter other dream.";
          validat = false
      }
      // console.log("ohter")
  }


  return validat
}
var step = 1;
function displayStep(step){
  console.log("step")
  console.log(step)
  
  console.log(step)

  $('.stepform').find('.sf-step').addClass('d-none')
  if(step==1){
      // validation function of true send to next 
      console.log("step 1 ")
      $('#sf-step1').removeClass('d-none')
      // let validateForm = checkValidationStepOne();
      // console.log("validateForm")
      // console.log(validateForm)
      // if(validateForm){
        // console.log(this.step + 1)
        //   step = step + 1;
        //   console.log(step)
      //     $('#sf-step1').addClass('d-none')
      //     $('#sf-step2').removeClass('d-none')
      //     console.log(step)
      // }
      // step++;
  }else if(step==2){
      // validation function of true send to next 

      $('#sf-step2').removeClass('d-none')
      // step++;
  }else if(step==3){
      $('#sf-step3').removeClass('d-none')
      // step++;
  }
}
// $(document).ready(function(){
//     displayStep(step)
// })

$(".next-btn-fun").on("click", function(e) {
  console.log("click next")
  console.log(e)
  e.preventDefault();

  // validation function of true send to next 
  // if
  // step++;
  console.log(step)


  // displayStep(step)
  $('.stepform').find('.sf-step').addClass('d-none')
  if(step==1){
      // validation function of true send to next 
      console.log("step 1 ")
      $('#sf-step1').removeClass('d-none')
      // let validateForm = checkValidationStepOne();
      // console.log("validateForm")
      // console.log(validateForm)
      // if(validateForm){
        // console.log(this.step + 1)
        //   step = step + 1;
        //   console.log(step)
      //     $('#sf-step1').addClass('d-none')
      //     $('#sf-step2').removeClass('d-none')
      //     console.log(step)
      // }
      step++;
  }else if(step==2){
      // validation function of true send to next 

      $('#sf-step2').removeClass('d-none')
      step++;
  }else if(step==3){
      $('#sf-step3').removeClass('d-none')
      step++;
  }
  console.log(step)
});
$(".prev-btn-fun").on("click", function(e) {
  // console.log("click prev")
  // console.log(step)
  e.preventDefault();
  step--
  displayStep(step)

});
$('.form-control').on("keyup change", function(event) {
  if(this.nextElementSibling.classList[0] === 'errorMsg'){
      this.nextElementSibling.innerHTML = ""
  }
});
