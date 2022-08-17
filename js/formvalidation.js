const stepInfo = [
  {
    title: "Income Details",
    subtitle: "Next:Financial Details",
    progress: "30",
    step:"1/4"
  },
  {
    title: "Deduction Details",
    subtitle: "Next:Deduction Details",
    progress: "40",
    step: "2/4"
  },
  {
    title: "Post Office Deposits Details",
    subtitle: "Next:Deduction Details",
    progress: "60",
    step: "2/4"
  },
  {
    title: "Deduction Details",
    subtitle: "Next:Result",
    progress: "80",
    step: "3/4"
  },
  {
    title: "Result",
    subtitle: "",
    progress: "100",
    step: "4/4"
  },
];
$(document).ready(function(){
  "use strict"
  var options="<option value='0' selected>Select age</option>"
  var optionsRetiment="<option value='0' selected>Select age</option>"
  for(let i =18; i <= 70; i++){
    options+="<option value="+i+">"+i+"</option>";
  }
  $('.option-age').append(options)

  for(let j =40; j <= 70; j++){
    optionsRetiment+="<option value="+j+">"+j+"</option>";
  }
  $('.retirementage').append(optionsRetiment)
})
// If user selecting other in Dream
// $(".display-sub").input(function () {
//   console.log($(this).val());
//   // if ($(this).val() == "others") {
//   //   $("#other_dream").addClass("d-block");
//   // } else {
//   //   $("#other_dream").removeClass("d-block");
//   // }
// });
function checkInput(id) {
  // console.log("this");
  let x = $("#"+id).val();
  let hideId = "#"+id+"Hide";
  // console.log(hideId);
  // console.log(x)
  if(x>0){
    $("#"+id+"Hide").removeClass('di-none')
  }else{
    $("#"+id+"Hide").addClass('di-none')
  }
}
// allow number function
function AllowOnlyNumbers(e) {
  e = e ? e : window.event;
  var clipboardData = e.clipboardData ? e.clipboardData : window.clipboardData;
  var key = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
  var str =
    e.type && e.type == "paste"
      ? clipboardData.getData("Text")
      : String.fromCharCode(key);
  return /^\d+$/.test(str);
}
// regular saving YES NO then show Monthaly income
$("input[type=radio][name=radio-saving]").change(function () {
  if ($(this).attr("id") == "yes_save") {
    $("#togglesavemonth").addClass("d-block");
  } else if ($(this).attr("id") == "no_save") {
    $("#togglesavemonth").removeClass("d-block");
  }
});
// check Validation for step one
function checkValidationStepOne() {
  let validat = true;

  let ageinput = document.forms["hlvform"]["ageinput"].value.trim();
  if (ageinput == 0) {
    document.getElementById("ageError").innerHTML = "Please select.";
    validat = false;
  }
  let taxableIncome = document.forms["hlvform"]["taxableIncome"].value.trim();
  if (taxableIncome == "") {
    document.getElementById("taxableIncomeError").innerHTML = "Please enter amount.";
    validat = false;
  }
  return validat;
}
function checkValidationStepTwo() {
  let validat = true;
  let lifeInsu = document.forms["hlvform"]["lifeInsu"].value.trim();
  if (lifeInsu == "") {
    document.getElementById("lifeInsuError").innerHTML = "Please enter amount.";
    validat = false;
  }

  let lifeInsuAfter = document.forms["hlvform"]["lifeInsuAfter"].value.trim();
  if (lifeInsuAfter == "") {
    document.getElementById("lifeInsuAfterError").innerHTML = "Please enter amount.";
    validat = false;
  }

  let annuityPlan = document.forms["hlvform"]["annuityPlan"].value.trim();
  if (annuityPlan == "") {
    document.getElementById("annuityPlanError").innerHTML = "Please enter amount.";
    validat = false;
  }
  let empProvi = document.forms["hlvform"]["empProvi"].value.trim();
  if (empProvi == "") {
    document.getElementById("empProviError").innerHTML = "Please enter amount.";
    validat = false;
  }

  return validat;
}
function checkValidationStepThree(){
  let validat = true;
  let ppf = document.forms["hlvform"]["ppf"].value.trim();
  if (ppf == "") {
    document.getElementById("ppfError").innerHTML = "Please enter amount.";
    validat = false;
  }
  let nsc = document.forms["hlvform"]["nsc"].value.trim();
  if (nsc == "") {
    document.getElementById("nscError").innerHTML = "Please enter amount.";
    validat = false;
  }
  let scss = document.forms["hlvform"]["scss"].value.trim();
  if (scss == "") {
    document.getElementById("scssError").innerHTML = "Please enter amount.";
    validat = false;
  }
  let potd = document.forms["hlvform"]["potd"].value.trim();
  if (potd == "") {
    document.getElementById("potdError").innerHTML = "Please enter amount.";
    validat = false;
  }
  let elss = document.forms["hlvform"]["elss"].value.trim();
  if (elss == "") {
    document.getElementById("elssError").innerHTML = "Please enter amount.";
    validat = false;
  }
  return validat;
}
function checkValidationStepFour(){
  let validat = true;
  let unitLinked = document.forms["hlvform"]["unitLinked"].value.trim();
  if (unitLinked == "") {
    document.getElementById("unitLinkedError").innerHTML = "Please enter amount.";
    validat = false;
  }

  let homeLoan = document.forms["hlvform"]["homeLoan"].value.trim();
  if (homeLoan == "") {
    document.getElementById("homeLoanError").innerHTML = "Please enter amount.";
    validat = false;
  }

  let sukanya = document.forms["hlvform"]["sukanya"].value.trim();
  if (sukanya == "") {
    document.getElementById("sukanyaError").innerHTML = "Please enter amount.";
    validat = false;
  }
  let fiveYear = document.forms["hlvform"]["fiveYear"].value.trim();
  if (fiveYear == "") {
    document.getElementById("fiveYearError").innerHTML = "Please enter amount.";
    validat = false;
  }
  let nabard = document.forms["hlvform"]["nabard"].value.trim();
  if (nabard == "") {
    document.getElementById("nabardError").innerHTML = "Please enter amount.";
    validat = false;
  }
  let tuition = document.forms["hlvform"]["tuition"].value.trim();
  if (tuition == "") {
    document.getElementById("tuitionError").innerHTML = "Please enter amount.";
    validat = false;
  }
  let nps = document.forms["hlvform"]["nps"].value.trim();
  if (nps == "") {
    document.getElementById("npsError").innerHTML = "Please enter amount.";
    validat = false;
  }
  return validat;
}


function contactInfoValidation() {
  var count = 0;
  // debugger;

  var mobVal = document.forms["hlvform"]["mobile"].value;
  if (mobVal == "") {
      document.getElementById('mobError').textContent = "Please enter your mobile number";
      count++;
  } else if (mobVal.length < 10) {
      document.getElementById('mobError').textContent = "Mobile number should contain 10 digit";
      count++;
  }
  var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  var emailVal = document.forms["hlvform"]["email"].value;
  if (emailVal != "") {
      if (regEmail.test(emailVal) == false) {
          document.getElementById('emailError12').textContent = "Please enter valid email address";
          count++;
      }
  } else {
      document.getElementById('emailError12').textContent = "Please enter your email address";
      count++;
  }

  let infrate = document.forms["hlvform"]["infrate"].value.trim();
  if (infrate == 0) {
    document.getElementById("rateError").innerHTML =
      "Please select inflation rate.";
    validat = false;
  }
  var code = document.forms["hlvform"]["code"].value;
  if (code == "") {
      document.getElementById('codeError').innerHTML = "Please enter vaild code.";
      count++;
  }
  if (count > 0) {
      return false;
  } else {
      return true;
  }
}
var step = 1;
var animationDisider = ""
function displayStep(step) {
  $(".stepform").find(".sf-step").addClass("d-none").removeClass('animate__slideInRight animate__slideInLeft');
  $('.top-title').text(stepInfo[step-1].title);
  $('.top-title2').text(stepInfo[step-1].subtitle);
  $('.progress-value-text').text(stepInfo[step-1].step);
  $('.progress').attr("data-percentage", stepInfo[step-1].progress)

  if (step == 1) {
    $("#sf-step1").removeClass("d-none").addClass(animationDisider);
  } else if (step == 2) {
    $("#sf-step2").removeClass("d-none").addClass(animationDisider);
  } else if (step == 3) {
    $("#sf-step3").removeClass("d-none").addClass(animationDisider);
  } else if (step == 4) {
    $("#sf-step4").removeClass("d-none").addClass(animationDisider);
  } else if (step == 5) {
    $("#sf-step5").removeClass("d-none").addClass(animationDisider);
  }

  
}

$(".next-btn-fun").on("click", function (e) {
  e.preventDefault();
  animationDisider = 'animate__slideInRight';
  $(".stepform").find(".sf-step").addClass("d-none");
  if (step == 1) {
    // validation function of true send to next
    $("#sf-step1").removeClass("d-none");
    let validateForm = checkValidationStepOne();
    if (validateForm) {
      step++;
      displayStep(step);
    }
  } else if (step == 2) {
    // validation function of true send to next
    $("#sf-step2").removeClass("d-none");
    let validateForm = checkValidationStepTwo();
    if (validateForm) {
      step++;
      displayStep(step);
    }
  } else if (step == 3) {
    // validation function of true send to next
    $("#sf-step3").removeClass("d-none");
    let validateForm = checkValidationStepThree();
    if (validateForm) {
      step++;
      displayStep(step);
    }
  }else if (step == 4) {
    // validation function of true send to next
    $("#sf-step4").removeClass("d-none");
    let validateForm = checkValidationStepFour();
    if (validateForm) {
      step++;
      displayStep(step);
    }
  } else if (step == 4) {
    step++;
    $("#sf-step4").removeClass("d-none");
  }
  console.log(step);
});
$(".prev-btn-fun").on("click", function (e) {
  
  e.preventDefault();
  animationDisider = 'animate__slideInLeft';

  step--;
  displayStep(step);
});

$(".form-control").on("keyup change", function (event) {
  if (this.nextElementSibling.classList[0] === "errorMsg") {
    this.nextElementSibling.innerHTML = "";
  }
});
function plan() {
  $('.all-plans').attr('style', 'display: none !important');
  $('#allcalculate').attr('style', 'display: block !important');
}
function hideplan() {
  let validateForm = contactInfoValidation()
  if (validateForm) {
      $('#allcalculate').attr('style', 'display: none !important');
      $('.all-plans').attr('style', 'display: block !important');
  }
}