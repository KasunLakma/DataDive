function setMainCategories(MainCategoryElement, phpFileName) {

    fetch(phpFileName).then(response => response.json()).then(jsonData => {
        for (let i in jsonData) {
            let optionElement = document.createElement("option");
            optionElement.value = i;
            optionElement.textContent = jsonData[i];
            MainCategoryElement.appendChild(optionElement);
        }
    });
}

function setSubCategory(MainCategoryValue, SubCategoryElement, phpFileName) {

    let jsonObject = {
        "category": MainCategoryValue,
    };

    fetch(phpFileName, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(jsonObject)

    }).then(response => response.json()).then(jsonData => {
        for (let value in jsonData) {
            let optionElement = document.createElement("option");
            optionElement.value = value;
            optionElement.textContent = jsonData[value];
            SubCategoryElement.appendChild(optionElement);
        }
    });
}

function clearSubCategorySelector(SubCategoryElement) {
    
    while(SubCategoryElement.options.length > 1){
        SubCategoryElement.options.remove(1);
    }

}

export function setUpTheCategorySelection(MainCategoryPhpFileLocation = "../../../php/PdfCategoryHandlers/mainCategoryHandler/mainCategoryHandler.php", SubCategoryPhpFileLocation = "../../../php/PdfCategoryHandlers/subCategoryHandler/subCategoryHandler.php", mainCategorySelector = ".categorySelectionContainer .mainCategorySelector", subCategorySelector = ".categorySelectionContainer .subCategorySelector") {
    let MainCategoryElement = document.querySelector(mainCategorySelector);
    let SubCategoryElement = document.querySelector(subCategorySelector);

    setMainCategories(MainCategoryElement, MainCategoryPhpFileLocation);

    MainCategoryElement.addEventListener("click", (event) => {

        let MainCategorySelectedIndex = MainCategoryElement.selectedIndex;

        if(MainCategorySelectedIndex ==0 && event.target.tagName == "OPTION"){
            clearSubCategorySelector(SubCategoryElement);
        }

        
        if(event.target.tagName == "OPTION"){
            clearSubCategorySelector(SubCategoryElement);
            setSubCategory((MainCategoryElement.options[MainCategorySelectedIndex]).value, SubCategoryElement, SubCategoryPhpFileLocation);
        }
    });
}
