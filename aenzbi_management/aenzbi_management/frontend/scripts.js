document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const saleForm = document.getElementById('saleForm');
    const userForm = document.getElementById('userForm');
    
    const productList = document.getElementById('productList');
    const saleList = document.getElementById('saleList');
    const userList = document.getElementById('userList');

    // Fetch and display products
    fetch('/products')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const li = document.createElement('li');
                li.textContent = ;
                productList.appendChild(li);
            });
        });

    // Add product
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('productName').value;
        const price = document.getElementById('productPrice').value;
        const stock = document.getElementById('productStock').value;
        
        fetch('/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price, stock })
        })
        .then(response => response.json())
        .then(product => {
            const li = document.createElement('li');
            li.textContent = ;
            productList.appendChild(li);
            productForm.reset();
        });
    });

    // Fetch and display sales
    fetch('/sales')
        .then(response => response.json())
        .then(sales => {
            sales.forEach(sale => {
                const li = document.createElement('li');
                li.textContent = `Product ID: ${sale.productId} - Quantity: ${sale.quantity} - Date: ${new Date(sale.date).toLocaleDateString()}`;
                saleList.appendChild(li);
            });
        });

    // Add sale
    saleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const productId = document.getElementById('saleProductId').value;
        const quantity = document.getElementById('saleQuantity').value;
        
        fetch('/sales', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, quantity, date: new Date() })
        })
        .then(response => response.json())
        .then(sale => {
            const li = document.createElement('li');
            li.textContent = `Product ID: ${sale.productId} - Quantity: ${sale.quantity} - Date: ${new Date(sale.date).toLocaleDateString()}`;
            saleList.appendChild(li);
            saleForm.reset();
        });
    });

    // Fetch and display users
    fetch('/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.username}`;
                userList.appendChild(li);
            });
        });

    // Add user
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(user => {
            const li = document.createElement('li');
            li.textContent = `${user.username}`;
            userList.appendChild(li);
            userForm.reset();
        });
    });
});
