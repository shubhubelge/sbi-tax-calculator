(function($) {
    var rslt = 0;
    var keys = {
        ESC: 27,
        TAB: 9,
        // RETURN: 13,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
    };

    $.fn.stepform = function(options) {
        var noop = $.noop;

        var options = $.extend({
            margin: 20,
            classes: "sf",
            navtext: {
                // next: "Next <img src='images/lp/btn-arrrow.svg'>",
                next: "Continue <img src='images/lp/btn-arrrow.svg'>",
                prev: "<img src='images/lp/btn-arrrow.svg'> Prev",
            },
            validate: true,
        }, options);

        return this.each(function() {
            var $this = $(this);

            $this
                .addClass('sf')
                .wrapInner("<div class='sf-container'></div>")
                .append("<div class='sf-navigation'></div>")
                .wrapInner("<div class='sf-wrapper'></div>")

            $this.steps = $this.find('.sf-step');
            $this.container = $this.find('.sf-container');
            $this.nav = $this.find('.sf-navigation');
            var stepsCount = $this.steps.length;
            var stepWidth = $this.width();
            $this.container.width(stepWidth * stepsCount);
            $this.steps.width(stepWidth);

            function buildNavigation(count) {
                $this.nav.append("<a class='nav-next continue' data-nav='1'>" + options.navtext.next + "</a>");
                $this.nav.append("<a class='nav-prev' data-nav='-1'>" + options.navtext.prev + "</a>");
                // $this.nav.append("<a class='nav-sub' >"+options.navtext.sub+"</a>");//added new
                // $this.nav.append("<input type='submit' value='Submit' class='btn btn-outline btn-danger pull-right nav-submit' />");
                for (let i = 1; i <= count; i++) {
                    $this.nav.append("<span data-navstep='" + i + "'></span>");
                }
            }

            function gotoStep(step) {
                // debugger;
                var index = step - 1;

                if (index > 0){//for continue button
                    $('.nav-next').removeClass('continue');                    
                }

                if (index == 0) {
                    $('.sf-navigation a.nav-prev').css('visibility', 'hidden');
                    $('.sf-navigation a.nav-next').html('Continue <img src="images/lp/btn-arrrow.svg">');
                    $('.nav-next').addClass('continue');
                    var abc = document.getElementById("sf-step3");
                    abc.style.display = "none";
                    var xyz = document.getElementById("sf-step2");
                    xyz.style.display = "none";
                    $('.sf-container').css('height', "auto");
                }
                else {
                    var abc = document.getElementById("sf-step3");
                    abc.style.display = "block";
                    var xyz = document.getElementById("sf-step2");
                    xyz.style.display = "block";
                    $('.sf-container').css('height', "auto");
                }

                if (index < 0 || step > stepsCount)
                    return;

                if (index == 2) {//for continue button to jump to plans page

                    $('.gotonext').addClass('continue-plans')
                        //.attr('href', '#allPlans'); 
                }

                if (!validateStep($this.data('activestep'), step))
                    return;

                $this.data('activestep', step);
                // console.log($this.data('activestep'));


                $this.steps.removeClass('sf-active');
                $this.steps.eq(index).addClass('sf-active');
                $this.nav.find('span').removeClass('sf-nav-active sf-nav-done').eq(index).addClass('sf-nav-active');
                $this.nav.find('span:lt(' + index + ')').addClass('sf-nav-done');
                $this.nav.find('.nav-prev').toggle(index == 0 ? false : true);
                $this.nav.find('.nav-next').toggle(index == stepsCount - 1 ? false : true);
                // $this.nav.find('.nav-sub').toggle(index==stepsCount-1?true:false);//added new
                // $this.nav.find('.nav-submit').toggle(index==stepsCount-1?true:false);

                

                $this.container.stop().animate({
                    marginLeft: '-' + stepWidth * (index) + 'px'
                }, 500, function() {
                    $this.steps.eq(index).find(':input:first').focus();
                });

            }

            function validateField($elem) {
                var valueLength = $.trim($elem.val()).length;
                var validate = $elem.data('validate');
                var hasError = false;

                $elem.parent().find('.sf-error-message').remove();
                $elem.parent().removeClass('sf-error');


                let errorMsg = "Please fill this field"
                var $radio = $('input:radio[name="otn1"]');
                $radio.addClass("validate[required]");

                // if(validate == "email"){
                // 	let pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
                // 	if(!pattern.test($elem.val())){
                // 	   hasError = true;
                // 	   errorMsg = "Please enter a valid email222 address"
                // 	}
                // }
                // else if(valueLength < validate){
                // 	hasError = true;
                // 	if($elem.data('validate') > 1)
                // 		errorMsg = "Needs to be minimum of " + validate + " characters"
                // }

                if (hasError) {
                    $elem.parent().addClass('sf-error');
                    // $elem.after('<span class="sf-error-message">'+errorMsg+'</span>');
                }


                return hasError;
            }

            $('body').on('click', 'a.nav-submit', function() {
            	console.log('snbdvfd');
                var valid = true;
                // var message = '';
                $('.error').remove();
                $('.agree').text();
                $('form input').each(function() {
                    var $this = $(this);

                    if (!$this.val()) {
                        var inputName = $this.attr('name');
                        valid = false;
                        // message += 'Please enter your ' + inputName + '\n';
                        $this.after('<p class="error" style="display: block;">This field is required</p>');
                    }
                });

                if (!isLetter() && valid != false) {
                    valid = false;
                    $('input[name="name"]').focus().after('<p class="error">Only letters are allowed for name</p>');
                }

                if (!isMobile() && valid != false) {
                    valid = false;
                    $('input[name="mobile"]').focus().after('<p class="error">Please enter a valid mobile number</p>');
                }

                
                var agreeCheck = $('input[name="agree"]')[0].checked;
                console.log(agreeCheck);
                if( agreeCheck == false)
                {
                    // message += 'Only letters are allowed for name' + '\n';
                  valid = false;
                  $('p.agree').html('Please accept terms and conditions to register.');
                }else{
                  $('p.agree').html('');
                }


                if (!valid) {
                    // alert(message);
                } else {

                    // 30-10-20
                    $('.showelement').addClass('actvrslt');
                    $('.stepper-form').addClass('remostep')

                    // window.location.href = "http://mockup.org.uk/Ravindra/sbi/result.html" + location.search;
                     // 30-10-20 end
                    // $('.post').attr('disabled', true);
                    // $('.post').html('<img class="spin" src="frontend/images/rotation.png" style="top: 0;position: relative;width: 16px;left: 47%;">');
                    var inopnrValSel1 = $('input[name="otn1"]:checked').attr('data-option');
                    var inopnrValSel2 = $('input[name="otn2"]:checked').attr('data-option');
                    var inopnrValSel3 = $('input[name="otn3"]:checked').attr('data-option');
                    var inopnrValSel4 = $('input[name="otn4"]:checked').attr('data-option');
                    var inopnrValSel5 = $('input[name="otn5"]:checked').attr('data-option');
                    var inopnrValSel6 = $('input[name="otn6"]:checked').attr('data-option');
                    var inopnrValSel7 = $('input[name="otn7"]:checked').attr('data-option');
                    var inopnrValSel8 = $('input[name="otn8"]:checked').attr('data-option');
                    var inopnrValSel9 = $('input[name="otn9"]:checked').attr('data-option');
                    var inopnrValSel10 = $('input[name="otn10"]:checked').attr('data-option');
                    // var inopnrValSel11 = $('input[name="otn11"]:checked').attr('data-option');
                    var inopnrValSel12 = $('input[name="otn12"]:checked').attr('data-option');
                    //Start Edited option 11
                    var inopnrValSel11 = $("input[name='otn11']:checkbox:checked").map(function(){
                          return "\"" + $(this).attr('data-option') + "\"";
                        }).get();
                    // console.log(inopnrValSel11);

                    var resfinancialAd = $('input[name="financialAdjust"]').val();
                    var resfinancialScore = $('input[name="financialScore"]').val();
                    var resredinessAd = $('input[name="readinessAdjust"]').val();
                    var resredinessScore = $('input[name="readinessScore"]').val();
                    var resfinancialWeight = $('input[name="financialAdjustWeight"]').val();
                    var resredinessWeight = $('input[name="readinessAdjustWeight"]').val();
                    var finalscore = $('input[name="finalscore"]').val();
                    var name = $('input[name="name"]').val();
                    var mobile = $('input[name="mobile"]').val();
                    var city = $('input[name="city"]').val();

                    var responseVar = '{"1":"'+inopnrValSel1+'","2":"'+inopnrValSel2+'","3":"'+inopnrValSel3+'","4":"'+inopnrValSel4+'","5":"'+inopnrValSel5+'","6":"'+inopnrValSel6+'","7":"'+inopnrValSel7+'","8":"'+inopnrValSel8+'","9":"'+inopnrValSel9+'","10":"'+inopnrValSel10+'","11":['+inopnrValSel11+'],"12":"'+inopnrValSel12+'"}';
                    //End Edited option 11
                    // console.log(responseVar);

                    $('.showelement').addClass('actvrslt');
                    $('.stepper-form').addClass('remostep');



                    // var othersres = JSON.parse('{"1":["98.98","96.96"],"2":["98.98","96.96"]}');


                    // console.log(chartData);
                    // generateScatterChart(chartDataN);

                    $.ajax({
                        url: "#",
                        type: 'POST',
                        data: {vis_name: name, vis_mobile: mobile, vis_city: city, vis_fin_weightage: resfinancialWeight, vis_fin_score: resfinancialScore, vis_rea_weightage: resredinessWeight, vis_rea_score: resredinessScore, vis_total: finalscore },
                        dataType: 'JSON',
                        success: function(result) {

                            var result = JSON.parse(result);

                            if (result.code == 200) {
                                
                                // var otherres = [{"financial":"27.00","readiness":"13.00"},{"financial":"22.00","readiness":"13.00"},{"financial":"12.00","readiness":"0.00"},{"financial":"98.98","readiness":"96.96"},{"financial":"98.98","readiness":"96.96"},{"financial":"98.98","readiness":"96.96"},{"financial":"98.98","readiness":"96.96"},{"financial":"98.98","readiness":"96.96"},{"financial":"98.98","readiness":"96.96"},{"financial":"98.98","readiness":"96.96"},{"financial":"98.98","readiness":"96.96"},{"financial":"98.98","readiness":"96.96"}];

                                var otherres = result.vis_others_res;

                                var chartN = [];

                                console.log(otherres);

                                //start logic
                                for (var i = 0; i < otherres.length; i++)
                                {
                                    chartN.push({_id:"5f96c1a5809cda15885831e2",name:"Cardenas Mosley",financial:(otherres[i].financial/50)*100,readiness:(otherres[i].readiness/50)*100});
                                }

                                chartN.push({financial:(resp.vis_fin_score/50)*100,readiness:(resp.vis_rea_score/50)*100});
                                //end logic
                                generateScatterChart(chartN);

                                $('.showelement').addClass('actvrslt');
                                $('.stepper-form').addClass('remostep');
                            } else {
                                console.log('success');
                            }

                        }
                    });
                }


            });

            function isMobile() {
                var mobile = $('input[name="mobile"]').val();
                var mobregex = /^[\d+]+$/;

                if (mobregex.test(mobile)) {
                    return true;
                } else {
                    return false;
                }
            }

            function isLetter() {
                var name = $('input[name="name"]').val();
                var letters = /^[a-zA-Z\s]*$/;
                if (letters.test(name)) {
                    return true;
                } else {
                    return false;
                }
            }

            function validateStep(activestep, nextstep) {
                var hasError = false;
                if (!options.validate)
                    return true;
                // console.log(activestep,nextstep);
                if (nextstep > activestep) {
                    $this.steps.eq(activestep - 1).find(':input[data-validate]').each(function(i) {
                        let thisError = validateField($(this))
                        hasError = hasError ? hasError : thisError;
                        if (hasError === true) {
                            //redirect
                            // window.location.href = "";
                        }
                    });
                }
                $this.nav.find('span').eq(activestep - 1).toggleClass('sf-nav-error', hasError);
                return hasError ? false : true;
            }

            function init() {
                buildNavigation(stepsCount);
                $this.data('activestep', 1);
                gotoStep(1);
                $this.sfbind();
                // console.log($this.data('activestep'));
                if ($this.data('activestep') == 1) {
                    $('.sf-navigation a.nav-prev').css('visibility', 'hidden');
                }

                $('.edit-link').click(function () {
                    // debugger;
                    gotoStep(1);
                    $('#allcalculate').attr('style', 'display: block !important');
                    $('.all-plans').attr('style', 'display: none !important');
                });

            }


            // click nav
            $this.nav.on('click', 'a', function(e) {
                var inopnrValSel1 = $('input[name="otn1"]:checked').val();
                var inopnrValSel2 = $('input[name="otn2"]:checked').val();
                var inopnrValSel3 = $('input[name="otn3"]:checked').val();
                var inopnrValSel4 = $('input[name="otn4"]:checked').val();
                var inopnrValSel5 = $('input[name="otn5"]:checked').val();
                var inopnrValSel6 = $('input[name="otn6"]:checked').val();
                var inopnrValSel7 = $('input[name="otn7"]:checked').val();
                var inopnrValSel8 = $('input[name="otn8"]:checked').val();
                var inopnrValSel9 = $('input[name="otn9"]:checked').val();
                var inopnrValSel10 = $('input[name="otn10"]:checked').val();
                var inopnrValSel11 = $('input[name="otn11"]:checked').val();
                var inopnrValSel12 = $('input[name="otn12"]:checked').val();

                var rslt = 0;
                var queWeightage = JSON.parse('{"1":"5","2":"7","3":"15","4":"12.5","5":"15","6":"5","7":"5","8":"5","9":"5","10":"10","11":"10","12":"5"}');

                // console.log("Que Values" + inopnrValSel1,inopnrValSel2,inopnrValSel3,inopnrValSel4,inopnrValSel5,inopnrValSel6,inopnrValSel7,inopnrValSel8,inopnrValSel9,inopnrValSel10,inopnrValSel11,inopnrValSel12);


                if(inopnrValSel1 && inopnrValSel2 && inopnrValSel3 && inopnrValSel4 && inopnrValSel5 &&inopnrValSel6 && inopnrValSel7 && inopnrValSel8 && inopnrValSel9 && inopnrValSel10 &&inopnrValSel11 && inopnrValSel12){

                // var queScore = JSON.parse('{"1":"5","2":"3.5","3":"15","4":"2.5","5":"10.5","6":"0","7":"0","8":"0","9":"10","10":"10","11":"2","12":"5"}');

                //financial
                // console.log(queWeightage);
                var totalFinancialWeight = parseFloat(queWeightage[1]) + parseFloat(queWeightage[3]) + parseFloat(queWeightage[10]) + parseFloat(queWeightage[12]) + parseFloat(queWeightage[11]) + parseFloat(queWeightage[9]); 

                //start logic
                var health = 0;
                if(inopnrValSel4 == 1.25)
                {
                    health = 2.5;
                }

                var investment = 0;
                if($('input[name="otn11"]:checked').length > 3 && $('input[name="otn11"][value="0"]').is(':checked') == false)
                {
                    investment = 3;
                }

                var liquid = 0;
                if(inopnrValSel10 == 2)
                {
                    liquid = 3;
                }

                var lifeinsurance = 0;
                if(inopnrValSel5 == 10.5)
                {
                    lifeinsurance = 12;
                }

                var totalFinancialScore = parseFloat(inopnrValSel1) + parseFloat(inopnrValSel3) + parseFloat(inopnrValSel10) + parseFloat(inopnrValSel12) + parseFloat(inopnrValSel11) + parseFloat(inopnrValSel9) + investment + liquid;

                if(totalFinancialScore >= 100)
                {
                    totalFinancialScore = 100;
                }

                var financialAdjust = (totalFinancialScore / 50) * 100;

                var totalReadinessWeight = parseFloat(queWeightage[2]) + parseFloat(queWeightage[4]) + parseFloat(queWeightage[5]) +parseFloat(queWeightage[6]) + parseFloat(queWeightage[7]) + parseFloat(queWeightage[8]); 

                var totalReadinessScore = parseFloat(inopnrValSel2) + parseFloat(inopnrValSel4) + parseFloat(inopnrValSel5) + parseFloat(inopnrValSel6) + parseFloat(inopnrValSel7) + parseFloat(inopnrValSel8) + health + lifeinsurance; 

                if(totalReadinessScore >= 100)
                {
                    totalReadinessScore = 100;
                }

                var readinessAdjust = (totalReadinessScore / 50) * 100;

                var rslt = (totalFinancialScore + totalReadinessScore);

                if(rslt >= 100)
                {
                    rslt = 100;
                }
                //end logic

                console.log("Financial" + totalFinancialWeight,totalFinancialScore,financialAdjust);
                console.log("Readiness" + totalReadinessWeight,totalReadinessScore,readinessAdjust);
                console.log("Adjust" + financialAdjust,readinessAdjust);
                console.log("result " + rslt);

                $('.stwitter a').attr("href","http://twitter.com/share?text=I scored "+rslt.toFixed(0)+"%25 on my Financial Immunity Results. Put your financial immunity to test and calculate how you fare https://www.sbilife.co.in/financialimmunity&amp;url=https://www.sbilife.co.in/financialimmunity&amp;hastags=financialimmunity");
                $('.slinkedin a').attr("href","http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fwww.sbilife.co.in%2Ffinancialimmunity");

                $('#financialAdjust').val(financialAdjust.toFixed(2));
                $('#readinessAdjust').val(readinessAdjust.toFixed(2));
                $('#financialScore').val(totalFinancialScore.toFixed(2));
                $('#readinessScore').val(totalReadinessScore.toFixed(2));
                $('#financialAdjustWeight').val(totalFinancialWeight.toFixed(2));
                $('#readinessAdjustWeight').val(totalReadinessWeight.toFixed(2));
                $('#finalscore').val(rslt);

                // let obj = {
                //     "financial": financialAdjust,
                //     "readiness": readinessAdjust
                // }
                // chartData.push(obj);

                }
                // if(sliderVal.length > 1)
                // {
                //     $('#preval').text(premiumVal[sliderVal]);
                // }


                // var rslt = parseInt(inopnrValSel1) + parseInt(inopnrValSel2) + parseInt(inopnrValSel3) + parseInt(inopnrValSel4) + parseInt(inopnrValSel5) + parseInt(inopnrValSel6) + parseInt(inopnrValSel7) + parseInt(inopnrValSel8) + parseInt(inopnrValSel9) + parseInt(inopnrValSel10) + parseInt(inopnrValSel11) + parseInt(inopnrValSel12);
                // $('.shqustrult').html("");

                // if (rslt <= 30) {
                //     $('.shqustrult').html("<b class='disprslt'>It's very important for you to strengthen your financial immunity to stay protected against any unforeseen situation.</b>")
                // } else if ((rslt >= 31) && (rslt <= 50)) {
                //     $('.shqustrult').html("<b class='disprslt'><span>Good start!</span> You are taking the right steps towards strengthening your financial immunity.</b>")
                // } else if ((rslt >= 51) && (rslt <= 75)) {
                //     $('.shqustrult').html("<b class='disprslt'><span>Great Going!</span> You save some and spend some.<i> Take this opportunity to further strengthen your financial immunity.</i></b>")
                // } else if ((rslt >= 76) && (rslt <= 90)) {
                //     $('.shqustrult').html("<b class='disprslt'><span>Super!</span> You seem to have a good financial immunity.<i> Keep enhancing it for a secured future.</i> </b>")
                // } else if ((rslt >= 91) && (rslt <= 100)) {
                //     $('.shqustrult').html("<b class='disprslt'>You seem to have a strong financial immunity. Stay the course and <i> keep enhancing your financial immunity.</i> </b>")
                // }

                // console.log(rslt);
                // var circle_scr = $('skill__circle').attr("data-value", rslt);
                // console.log(circle_scr);
                // rslt = circle_scr;
                // $('.rating-num').html(rslt + "%")


                // chart 2




                // console.log($this.data('activestep') + " hjgfjh " + $(this).data('nav'));
                if ($(this).data('nav') == "1") {

                    if ($this.data('activestep') == 3) {
                        // $this.nav.append("<a class='nav-submit' data-nav='0'>SUBMIT <img src='images/arrow.svg'></a>");/*SP-29-10-2020*/
                        $('.sf-navigation a.nav-prev').css('visibility', 'hidden');
                    } else {
                        // console.log('else' + $this.data('activestep'));
                        $('.sf-navigation a.nav-next').html('Next <img src="images/lp/btn-arrrow.svg">');
                        $('.sf-navigation a.nav-prev').css('visibility', 'visible');
                        // if ($(".sf-active .otn1:checked").length == 0) {
                        //     // alert('Gender is required')
                        //     // console.log(56465465);
                        //     $('.sf-active .shw').remove();
                        //     $('.sf-active').append("<b class='shw'> Please choose an option to proceed </b>");
                        //     return false;
                        // }
                    }

                }



                e.preventDefault();
                gotoStep($this.data('activestep') + $(this).data('nav'))

                // var cnthe = $('.sf-container').height();
                var feldthe1 = $('.sf-active').height() + 0;
                $('.sf-container').css('height', feldthe1 + "px")
                // console.log(feldthe);

                // function generateRadialChart() {
                // var progressBarOptions = {
                //     startAngle: -1.55,
                //     size: 250,
                //     lineCap: "round",
                //     thickness: 18,
                //     emptyFill: "#E0F6FD",
                //     value: rslt /100,
                //     fill: {
                //         color: '#93D500'
                //     }
                // }
                // $('.circle-1').circleProgress(progressBarOptions).on('circle-animation-progress', function(event, progress, stepValue) {
                //     let val = (stepValue * 100).toFixed(0)
                //     $(this).find('strong').html(`${val}%`)
                // });

                // var progressBarOptions2 = {
                //     startAngle: -1.55,
                //     size: 250,
                //     lineCap: "round",
                //     thickness: 18,
                //     emptyFill: "#E0F6FD",
                //     value: rslt /100,
                //     fill: {
                //         color: '#00B3EE'
                //     }
                // }
                // $('.circle-2').circleProgress(progressBarOptions2).on('circle-animation-progress', function(event, progress, stepValue) {
                //     let val = (stepValue * 100).toFixed(0)
                //     $(this).find('strong').html(`${val}%`)
                // });

                // var progressBarOptions3 = {
                //     startAngle: -1.55,
                //     size: 250,
                //     lineCap: "round",
                //     thickness: 18,
                //     emptyFill: "#E0F6FD",
                //     value: rslt /100,
                //     fill: {
                //         color: '#FCE200'
                //     }
                // }
                // $('.circle-2').circleProgress(progressBarOptions3).on('circle-animation-progress', function(event, progress, stepValue) {
                //     let val = (stepValue * 100).toFixed(0)
                //     $(this).find('strong').html(`${val}%`)
                // });

                // }




            });

            // $("button").click(function(){
            // 	var selValue = $("input[type='radio']:checked").val();
            // 	console.log(selValue);
            // });



            // key navs
            $this.steps.each(function() {
                // ON LAST ELEMENT tab go to next page
                // on first element  shift+tab go to prev page
                // on enter in any element, behave like tab
                // on submit enter form submit
                var $thisInputs = $(this).find(':input');
                $thisInputs.filter(':first').addClass('sf-step-first');
                $thisInputs.filter(':last').addClass('sf-step-last');

                $thisInputs.filter(":radio.sf-step-first,:radio.sf-step-last").each(function(i) {
                    let $elem = $thisInputs.filter("input[name='" + $(this).attr('name') + "']");
                    if ($(this).hasClass("sf-step-first"))
                        $elem.addClass("sf-step-first")
                    if ($(this).hasClass("sf-step-last"))
                        $elem.addClass("sf-step-last")
                })

                $thisInputs.keydown(function(e) {
                    if ($(this).data('validate'))
                        validateField($(this));

                    if ($.inArray(e.which, [keys.RETURN]) >= 0) {
                        if (!$(this).is(':submit')) {
                            e.preventDefault();
                            if ($(this).is('.sf-step-last'))
                                gotoStep($this.data('activestep') + 1)
                            else
                                $thisInputs.eq($thisInputs.index($(this)) + 1).focus();
                        }
                    } else if ($.inArray(e.which, [keys.TAB]) >= 0) {

                        if (!e.shiftKey && $(this).is('.sf-step-last')) {
                            e.preventDefault();
                            gotoStep($this.data('activestep') + 1)
                        } else if (e.shiftKey && $(this).is('.sf-step-first')) {
                            e.preventDefault();
                            gotoStep($this.data('activestep') - 1)
                        }
                    }


                });

            });


            init();
        }); //this each

    };
})(jQuery);

(function($) {

    $.fn.sfbind = function(options) {

        var options = $.extend({}, options);

        return this.each(function() {
            var $this = $(this);

            $this.find('[data-sf-bind]').each(function() {
                let fieldName = $(this).data('sf-bind');
                $this.on('change keyup keydown', '[name="' + fieldName + '"]', function(e) {
                    // $this.find('').keydown(function(e){
                    $this.find('[data-sf-bind="' + fieldName + '"]').html($(this).val());
                });
            })

        }); //this each
    };
})(jQuery);

$(document).ready(function() {
    $(".stepform").stepform();
    var feldthe = $('.sf-active').height();
    $('.sf-container').css('height', feldthe + "px");

    // generateRadialChart();
    //generateScatterChart();

// $('.nav-submit').clic


});
//
// $('input').focus(function() {
//     $(this).parents('.form-group').addClass('focused');
// });

// $('input').blur(function() {
//     var inputValue = $(this).val();
//     if (inputValue == "") {
//         $(this).removeClass('filled');
//         $(this).parents('.form-group').removeClass('focused');
//     } else {
//         $(this).addClass('filled');
//     }
// });


//Checkboxes selection script
// $(document).ready(function() {
//     $(".mdhchkbx").on('click', function() {
//         if ($(this).find("input").is(':checked')) {
//             $(this).addClass("act");
//         } else {
//             $(this).removeClass("act");
//         }
//     });
// });


// function generateScatterChart(chartData) {

// 	// set the dimensions and margins of the graph
// 	var maxWidth = Math.min(window.outerWidth, 460)
//     var maxHeight = Math.min(window.outerHeight, 460)
//     var margin = {
//             top: 10,
//             right: 30,
//             bottom: 60,
//             left: 60
// 		},
// 		dim = Math.min(maxWidth, maxHeight)
//         width = 460 - margin.left - margin.right,
//         height = 400 - margin.top - margin.bottom;
//     $('#my_dataviz').html('')
//     $('#my_dataviz').append(`
//     	<ul class="legends">
//     	<li><span class="crc" style="background:green"></span> You are Here</li>
//     	</ul>
//     	`)
//     var Tooltip = d3.select("#my_dataviz")
//         .append("div")
//         .attr("class", "tooltip")
//         .style("background-color", "white")
//         .style("border", "solid")
//         .style("border-width", "2px")
//         .style("border-radius", "5px")
//         .style("padding", "5px")
//     // append the svg object to the body of the page
//     var svg = d3.select("#my_dataviz")
//         .append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform",
//             "translate(" + margin.left + "," + margin.top + ")");



//     // Add X axis
//     var x = d3.scaleLinear()
//         .domain([0, 100])
//         .range([0, width]);
//     svg.append("g")
//         .attr("transform", "translate(0," + height + ")")
//         .call(d3.axisBottom(x));


//     // Add Y axis
//     var y = d3.scaleLinear()
//         .domain([0, 100])
//         .range([height, 0]);
//     svg.append("g")
//         .call(d3.axisLeft(y));

//     var lowRectangle = svg.append("rect")
//         .attr("x", 0)
//         .attr("y", 0)
//         .attr("width", width / 2)
//         .attr("height", height)
//         .style("fill", "#fff1ed");

//     var highRectangle = svg.append("rect")
//         .attr("x", width / 2)
//         .attr("y", 0)
//         .attr("width", width / 2)
//         .attr("height", height)
//         .style("fill", "#bee9fe");

//     svg.append('line')
//         .attr('class', 'centerX')
//         .attr("x1", 0)
//         .attr("y1", height / 2)
//         .attr("x2", width)
//         .attr("y2", height / 2)
//         .attr("stroke-width", 1)
//         .attr("stroke", "black")
//         .style("stroke-dasharray", ("3, 3"))
//         .attr('class', 'centerX')


//     svg.append('line')
//         .attr('class', 'centerX')
//         .attr("x1", width / 2)
//         .attr("y1", 0)
//         .attr("x2", width / 2)
//         .attr("y2", height)
//         .attr("stroke-width", 1)
//         .attr("stroke", "black")
//         .style("stroke-dasharray", ("3, 3"))
//         .attr('class', 'centery')




//     // Add dots
//     svg.append('g')
//         .selectAll("dot")
//         .data(chartData)
//         .enter()
//         .append("circle")
//         .attr("cx", function(d) {
//             return x(d.readiness);
//         })
//         .attr("cy", function(d) {
//             return y(d.financial);
//         })
//         .attr("r", 7)
//         .style("fill", function(d) {
//             // console.log(d)
//             if (!d.hasOwnProperty('_id')) {
//                 return "green"
//             } else if (d.readiness < 50) {
//                 return "#ffb89c"
//             } else {
//                 return '#13abff'
//             }
//         })
//         .on('mouseover', function(d) {
//             Tooltip
//                 .style("display", "block")
//             d3.select(this)
//                 .style("stroke", "black")
//                 .style("opacity", 5)
//         })
//         .on('mousemove', function(d) {
//             let title = ''
//             if (!d.hasOwnProperty('_id')) {
//                 title = 'You are here.<br/>'
//             }
//             Tooltip
//                 .html(`${title}<strong>Immunity against Risk: </strong>${d.financial.toFixed(0)}%<br/><strong>Financial Readiness: </strong>${d.readiness.toFixed(0)}%`)
//                 .style("left", (d3.mouse(this)[0] + 70) + "px")
//                 .style("top", (d3.mouse(this)[1]) + "px")
//                 .style("z-index", "1070")
//         }).on('mouseleave', function(evt) {
//             Tooltip
//                 .style("display", "none")
//             d3.select(this)
//                 .style("stroke", "none")
//                 .style("opacity", 0.8)
//         });



//     svg.append("text")
//         .attr("class", "x label")
//         .attr("text-anchor", "middle")
//         .attr("x", width / 4)
//         .attr("y", height + 30)
//         .text("Low");

//     svg.append("text")
//         .attr("class", "x label")
//         .attr("text-anchor", "middle")
//         .attr("x", width / 1.3)
//         .attr("y", height + 30)
//         .text("High");

//     svg.append("text")
//         .attr("class", "x label finradial")
//         .attr("text-anchor", "middle")
//         .attr("x", width / 2)
//         .attr("y", height + 50)
//         .text("Financial Readiness");

//     svg.append("text")
//         .attr("transform", "rotate(-90)")
//         .attr("y", -40)
//         .attr("x", 0 - (height / 1.4))
//         .attr("dy", "1em")
//         .style("text-anchor", "middle")
//         .text("Low");

//     svg.append("text")
//         .attr("transform", "rotate(-90)")
//         .attr("y", -40)
//         .attr("x", 0 - (height / 4))
//         .attr("dy", "1em")
//         .style("text-anchor", "middle")
//         .text("High");

//     svg.append("text")
// 		.attr("transform", "rotate(-90)")
// 		.attr("class", "immrsk")
//         .attr("y", 0 - margin.left)
//         .attr("x", 0 - (height / 2))
//         .attr("dy", "1em")
//         .style("text-anchor", "middle")
//         .text("Immunity against Risk");
// }

