var r=document.getElementById('result');

function startConverting()
{
 
        if('webkitSpeechRecognition'in window){ //Web speech API Function
            var speechRecognizer = new webkitSpeechRecognition(); 
            speechRecognizer.continuous = true; // 마이크 캡처동안 결과 보내지않음 
            speechRecognizer.interimResults = true;
            speechRecognizer.lang="ko-KR"; //언어
            speechRecognizer.start(); // 시작
 
            var finalTranscripts = '';
 
            // 음성 캐치기능이 시작될 때 
            speechRecognizer.onresult=function(event){
                var interimTranscripts='';
                for(var i=event.resultIndex; i < event.results.length; i++)
                {
                    var transcript=event.results[i][0].transcript; 
                    transcript.replace("\n","<br>");
 
                    //isFinal : if speech recognition is finished, isFinal = true
                    if(event.results[i].isFinal){
                        finalTranscripts+=transcript;
                    }
                    else{
                        interimTranscripts+=transcript;
                    }
                }
                //insert into HTML
                r.innerHTML=finalTranscripts+'<span style="color:#999">'+interimTranscripts+'</span>';
            };


            // 오류 발생
            speechRecognizer.onerror = function(event){
                document.querySelector("#status").style.display = "none";
            };
        }
        else{
            //if browser don't support this function. this message will show in your web
            r.innerHTML ="your browser is not supported. If google chrome. Please upgrade!";
        }
}


startConverting();