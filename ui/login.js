function check(form) { /*function to check userid & password*/
                /*the following code checkes whether the entered userid and password are matching*/
                if(form.uname.value == "admin" && form.psw.value == "abhay163020") {
                    window.open('/index')/*opens the target page while Id & password matches*/
                }
                else if(form.uname.value == "user" && form.psw.value == "login") {
                    window.open('/index')/*opens the target page while Id & password matches*/
                }
                else if(form.uname.value == "username" && form.psw.value == "password") {
                    window.open('/index')/*opens the target page while Id & password matches*/
                }
                else if(form.uname.value == "vishal" && form.psw.value == "meanie") {
                    window.open('/index')/*opens the target page while Id & password matches*/
                }
                else if(form.uname.value == "arpitha" && form.psw.value == "letmein") {
                    window.open('/index')/*opens the target page while Id & password matches*/
                }
				
			    else if(form.uname.value == "apeksha" && form.psw.value == "srichaitanya") {
                    window.open('/index')/*opens the target page while Id & password matches*/
                }
                
                 else if(form.uname.value == "megha" && form.psw.value == "piggy") {
                    window.open('/index')/*opens the target page while Id & password matches*/
                }
                
                else if(form.uname.value == "vidhya" && form.psw.value == "naayi") {
                    window.open('/index')/*opens the target page while Id & password matches*/
                }
                
                else if(form.uname.value == "divya" && form.psw.value == "fillefolle") {
                    window.open('/index')/*opens the target page while Id & password matches*/
                }
				
				else if(form.uname.value == "sharan" && form.psw.value == "sharanshinduja") {
                    window.open('/index')/*opens the target page while Id & password matches*/
                } 
                
                else if(form.uname.value == null && form.psw.value == null) {
                    window.open('/guest')/*opens the target page while Id & password matches*/
                } 
				
                else {
                    window.open('/guest')/*displays error message*/
                }
            }
