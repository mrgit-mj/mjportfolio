
        function submit() {
            
            // $.get('https://geoip-db.com/json/', data => {
            //     sendEmail(JSON.parse(data))
            // });
            
            
            function sendEmail() {
                let respMessage = `<div id="messageHolder" class="alert alert-success" role="alert">
                  Thanks for contacting me. I will get back to you as soon as possible
                </div>`
                let btn = document.getElementById('submit-btn');
                btn.disabled = true;
                let form = document.getElementById('form');
                let name = document.getElementById('name').value;
                let email = document.getElementById('email').value;
                let subject = document.getElementById('subject').value;
                let message = document.getElementById('message').value;
                let link = 'https://asia-east2-hannyswings.cloudfunctions.net/api/email'
                $.post(link, {name, email, subject, message})
                .done(response => {
                    form.innerHTML = '';
                    form.innerHTML = respMessage;
                })
            }     
            sendEmail();
        }
    