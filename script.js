// =============================================================
// ScrIMS — script.js
// This file handles ALL JavaScript for every page.
// Use document.getElementById / querySelector to target elements.
// =============================================================

// TIP: Since all pages share this one script.js, wrap each page's
// logic in an IF check so it only runs on the right page:
//
//   if (document.title === "Dashboard") {  ...dashboard code...  }
//   if (document.title === "Catalog")   {  ...catalog code...    }
//   etc.
//
// This way one script.js file works across all pages without errors.

// =============================================================
// 1. DASHBOARD (index.html) — title: "Document" (change to "Dashboard")
// =============================================================
// TODO: Search bar filter — filter table rows as user types
// TODO: Edit button — turn row cells into inputs on click
// TODO: Delete row — remove a table row on button click
// TODO: Dynamic card counts — update metrics from table data
// TODO: Add row — insert a new blank row into the table

// =============================================================
// 2. CATALOG (catalog.html) — title: "Catalog"
// =============================================================
// TODO: Filter by category dropdown
// TODO: Search filter (reuse search bar logic)
// TODO: Sort by column (click <th> to sort)
// TODO: Update visible product count

// =============================================================
// 3. CATEGORIES (categories.html) — title: "Categories"
// =============================================================
// TODO: Show/hide "new category" input on button click
// TODO: Add category card on Enter key press
// TODO: Delete category card on "X" click
// TODO: Click category card to redirect to filtered catalog

// =============================================================
// 4. STOCK IN (stock-in.html) — title: "Stock In"
// =============================================================
// TODO: Form validation — check all fields filled
// TODO: Add entry to Recent Stock-In table
// TODO: Clear form after submit
// TODO: Auto-fill SKU when product selected
// TODO: Save entries to localStorage

// =============================================================
// 5. STOCK OUT (stock-out.html) — title: "Stock Out"
// =============================================================
// TODO: Form validation — check all fields filled
// TODO: Quantity check — don't allow more than available stock
// TODO: Add entry to Recent Stock-Out table
// TODO: Clear form after submit
// TODO: Save entries to localStorage

// =============================================================
// 6. ADD PRODUCT (add-product.html) — title: "Add Product"
// =============================================================
// TODO: Form validation — check required fields
// TODO: Save product to localStorage
// TODO: Show success message, hide after 3 seconds
// TODO: Clear form after save
// TODO: Prevent duplicate SKU

// =============================================================
// 7. ALERTS (alerts.html) — title: "Alerts"
// =============================================================
// TODO: Auto-generate alert cards from localStorage products (qty < 10)
// TODO: Dismiss single alert card
// TODO: Dismiss all alerts
// TODO: Update alert count badge
// TODO: Color code: .warning for low stock, .error for out of stock

// =============================================================
// 8. REPORTS (reports.html) — title: "Reports"
// =============================================================
// TODO: Load products + transactions from localStorage into table
// TODO: Calculate totals for summary cards
// TODO: Date range filter
// TODO: Export table to CSV file
// TODO: Sort table by column headers



function initializeStorage(){
    let products = JSON.parse(localStorage.getItem("products"));

    if(!products){
        products = [
            { name: "Wireless Mouse", sku: "MS-WRLS-01", category: "Accessories", supplier: "TechyCom", quantity: 150, price: 150.00, description: "Comfortable wireless mouse" },
            { name: "Mechanical Keyboard", sku: "KB-MECH-02", category: "Accessories", supplier: "TechyCom", quantity: 8, price: 2500.00, description: "RGB Mechanical Keyboard" },
            { name: "HDMI Cable 6ft", sku: "CB-HDMI-06", category: "Cables", supplier: "LinkUp", quantity: 0, price: 350.00, description: "High speed HDMI cable" }
        ];

        localStorage.setItem("products", JSON.stringify(products));  
    }
    return products;
}

function handleAddProductPage(){
    const addBtn = document.querySelector(".add-btn");
    if(!addBtn)
        return;

    let successMsg = document.getElementById("success-msg");
    if(!successMsg){
        successMsg = document.createElement("p");
        successMsg.id = "success-msg";
        successMsg.style.display = "none";
        successMsg.style.color= "green";
        successMsg.style.fontWeight = "bold";
        document.querySelector(".info-line").appendChild(successMsg);

    }

    addBtn.addEventListener("click", ()=>{
        const nameInput = document.querySelector(".product-name input");
        const skuInput = document.querySelector(".SKU-code input");
        const categorySelection = document.getElementById("category");
        const supplierInput = document.querySelector(".supplier input");
        const quantityInput = document.querySelector(".quantity input");
        const priceInput = document.querySelector(".price input");
        const descriptionInput = document.querySelector(".description-box input");

        if(!nameInput.value.trim()  ||
            !skuInput.value.trim()  || 
            categorySelection.value ==="Select a Category" || 
            !quantityInput.value    || 
            !priceInput.value
        ){
            alert("Please fill out all required fields (Name, SKU, Category, Quantity, and Price).");
            return;

        }

        let products = JSON.parse(localStorage.getItem("products")) || [];

        //check if sku exists
        const skuExists = products.some(p => p.sku.toLowerCase() ===skuInput.value.trim().toLowerCase());

        if(skuExists){
            alert("Product with this sku already exists");
            return;
        }
         

        //saving to localstorage
        const newProduct = {
            name :nameInput.value.trim(),
            sku : skuInput.value.trim(),
            category : categorySelection.value,
            supplier : supplierInput.value.trim() || "N/A",
            quantity: parseInt(quantityInput.value),
            price : parseFloat(priceInput.value),
            description : descriptionInput.value.trim() || ""
        };

        products.push(newProduct);

        localStorage.setItem("products", JSON.stringify(products));

        //success
        successMsg.textContent= `Product "${newProduct.name}" added successfully`;
        successMsg.style.display = "block";
        setTimeout(() => {
            successMsg.style.display = "none";
        }, 3000);

        //clear form

        nameInput.value = "";
        skuInput.value = "";
        categorySelection.value = "Select a Category";
        supplierInput.value = "";
        quantityInput.value = "";
        priceInput.value  = "";
        descriptionInput.value = "";

    });

}

document.addEventListener("DOMContentLoaded", () => {
    initializeStorage();
    handleAddProductPage();
    // handleDashboardPage();
    // handleSearchFilter();
});

