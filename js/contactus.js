
        function submit() {
            
            $.get('https://geoip-db.com/json/', data => {
                sendEmail(JSON.parse(data))
            });
            
            
            function sendEmail(geoip) {
                let respMessage = `<div id="messageHolder" class="alert alert-success" role="alert">
                  Thanks for contacting me. I will get back to you as soon as possible
                </div>`
                let form = document.getElementById('form');
                let name = document.getElementById('name').value;
                let email = document.getElementById('email').value;
                let subject = document.getElementById('subject').value;
                let message = document.getElementById('message').value;
                
                $.post('http://Spanarestful-env-1.ghqmmhq8xz.eu-north-1.elasticbeanstalk.com/api/contact', {name, email, subject, message, geoip})
                .done(response => {
                    form.innerHTML = '';
                    form.innerHTML = respMessage;
                })
            }     
            
        }
    