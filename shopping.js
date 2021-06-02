    var items = [
        ['images/beanyWhite.png',19.99,'White Beany'],
        ['images/jumperBlack.png',49.99,'Black Jumper'],
        ['images/jumperWhite.png',49.99,'White Jumper'],
        ['images/teeWhite.png',39.99,'White Tee-shirt'],
        ['images/teeBlack.png',39.99,'Black Tee-shirt'],
        ['images/whiteHoodie.png',79.99,'White Hoodie']
    ];
    
    var cartItems = [];
    
    function run(){
        
        for (var i = 0; i < items.length; i++){
        
            var main = document.getElementById('products');

            var ele = document.createElement('li')
            var pic = document.createElement('img')
            var price = document.createElement('h1')
            var desc = document.createElement('h2')
            var add = document.createElement('button')
            var typeBox = document.createElement('input')

            main.appendChild(ele);
            ele.appendChild(pic);
            ele.appendChild(price);
            ele.appendChild(desc);
            ele.appendChild(add);
            ele.appendChild(typeBox);

            pic.src = items[i][0];
            price.innerHTML = '$' + items[i][1];
            desc.innerHTML = items[i][2];
            add.innerHTML = 'add';
            typeBox.type = 'number';
            
            typeBox.setAttribute("id", "input" + i);
            typeBox.value = 1;
            
            add.dataset.cartIndex = i;
            add.addEventListener('click', adding, false);
        }
        
    }

    function adding(event){
        const NUM = event.currentTarget.dataset.cartIndex;

        cartItems.push([items[NUM]]);
        cartItems[cartItems.length-1][1] = Number(document.getElementById('input'+NUM).value);
        updateCart();
    }

    var totalItems = 0;

    function updateCart(){
        var itemCounter = document.getElementById('itemCount');

        totalItems = 0;   
        for(var i = 0; i < cartItems.length; i++){
            totalItems += cartItems[i][1]                
        }

        window.sessionStorage.setItem('cartItems', JSON.stringify(cartItems));   

        /*var data = sessionStorage.getItem('cartItems');
        data = JSON.parse(data);

        cartItems = data;*/
        itemCounter.innerHTML = totalItems;
    }

    function loadCart(){
        var main = document.getElementById('cartProducts');

        var data = sessionStorage.getItem('cartItems');
        data = JSON.parse(data);

        cartItems = data;

        updateCart();

        for (var i = 0; i < cartItems.length; i++){


            var ele = document.createElement('li')
            var pic = document.createElement('img')
            var price = document.createElement('h1')
            var desc = document.createElement('h2')
            var deleteItem = document.createElement('button')
            var amount = document.createElement('h2')
            var subtotal = document.createElement('h3')

            main.appendChild(ele);
            ele.appendChild(pic);
            ele.appendChild(price);
            ele.appendChild(desc);
            ele.appendChild(deleteItem);
            ele.appendChild(amount);
            ele.appendChild(subtotal);

            pic.src = cartItems[i][0][0];
            price.innerHTML = '$' + cartItems[i][0][1];
            desc.innerHTML = cartItems[i][0][2];

            deleteItem.innerHTML = 'Delete';                
            deleteItem.dataset.cartIndex = i;
            deleteItem.addEventListener('click', deleteMe, false);

            amount.innerHTML = cartItems[i][1];
            subtotal.innerHTML = '$' + cartItems[i][1] * cartItems[i][0][1];
        }

    }

    function deleteMe(){
        const NUM = event.currentTarget.dataset.cartIndex;

        delete cartItems[NUM];

        cartItems = cartItems.filter(item => item !== undefined);

        updateCart();
        loadCart();
        window.location.reload(true);
    }