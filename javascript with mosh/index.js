//javascript should be written at the end of the body for 2 reasons.
            //1. it gives a bad user experience as the browser will be busy loading javascript. the page will be blank before it loads tehe words and other things. this aint good.
            //2. we want to be sure that it loads all the elements of html

            // let firstName = 'mugabi';
            // let secondName = 'praise';
            
            //object
            // let person = {
            //     firstName : 'mugabi',
            //     secondName : 'praise'
            // }
            // person.firstName = 'MUGABII'
            // person['secondName'] = 'PRAISE'

            // console.log(person.firstName)
            // console.log(person.secondName)

            // array
            // let mugabiSons = ['blessed', 'brilliant']
            // mugabiSons[2] = 'praise'
            // console.log(mugabiSons[0])
            // console.log(mugabiSons.length)
            // console.log(mugabiSons)
            // mugabiSons[3] = 'kevin'
            // console.log(mugabiSons)

            //function
            function greeting(firstName, secondName){
                console.log('hi ' + firstName + ' ' + secondName + '; welcome aboard')
            }

            greeting('praise', 'mugabi');