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
				
			
				
				
                else {
                    alert("Please check your username and password")/*displays error message*/
                }
            }
