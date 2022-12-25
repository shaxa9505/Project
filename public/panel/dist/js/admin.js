window.addEventListener("load", () => {
    const wrapperAboutFon = document.querySelector(".wrapperForm .wrapperAboutFon"),
        defaultFon = document.querySelector(".wrapperForm #defaultFon-btn"),
        customBtnFon = document.querySelector(".wrapperForm #aboutFon-btn"),
        cancelBtnFon = document.querySelector(".wrapperForm .wrapperAboutFon #cancel-btn i"),
        imgFon = document.querySelector(".wrapperForm .wrapperAboutFon .image img"),
        contentFon = document.querySelector(".wrapperForm .wrapperAboutFon .content"),
        aboutFonWrapper = document.querySelector(".formWrapper .aboutFonWrapper"),
        defaultEdit = document.querySelector(".formWrapper #defaultEdit-btn"),
        aboutEdit = document.querySelector(".formWrapper #aboutEdit-btn"),
        cancelBtnEdit = document.querySelector(".formWrapper .aboutFonWrapper #cancel-btn i"),
        imgEdit = document.querySelector(".formWrapper .aboutFonWrapper .image img"),
        contentEdit = document.querySelector(".formWrapper .aboutFonWrapper .content"),
        skillsAddWrapper = document.querySelector(".skillsAdd .skillsAddWrapper"),
        skillsAddImg = document.querySelector(".skillsAdd .skillsAddWrapper .image img"),
        skillsAddContent = document.querySelector(".skillsAdd .skillsAddWrapper .content"),
        skillsAddCancelBtn = document.querySelector(".skillsAdd .skillsAddWrapper #cancel-btn i"),
        skillsAddFile = document.querySelector(".skillsAdd #skillFile-btn"),
        skillsAddChoose = document.querySelector(".skillsAdd #skillChoose"),
        skillsEditWrapper = document.querySelector(".skillsEdit .skillsEditWrapper"),
        skillsEditImg = document.querySelector(".skillsEdit .skillsEditWrapper .image img"),
        skillsEditContent = document.querySelector(".skillsEdit .skillsEditWrapper .content"),
        skillsEditCancelBtn = document.querySelector(".skillsEdit .skillsEditWrapper #cancel-btn i"),
        skillsEditFile = document.querySelector(".skillsEdit #skillFile-btn"),
        skillsEditChoose = document.querySelector(".skillsEdit #skillChoose"),
        technologyAddWrapper = document.querySelector(".technologyAdd .technologyAddWrapper"),
        technologyAddImg = document.querySelector(".technologyAdd .technologyAddWrapper .image img"),
        technologyAddContent = document.querySelector(".technologyAdd .technologyAddWrapper .content"),
        technologyAddCancelBtn = document.querySelector(".technologyAdd .technologyAddWrapper #cancel-btn i"),
        technologyAddFile = document.querySelector(".technologyAdd #technologyAddFile"),
        technologyAddChoose = document.querySelector(".technologyAdd #technologyAddChoose"),
        technologyEditWrapper = document.querySelector(".technologyEdit .technologyEditWrapper"),
        technologyEditImg = document.querySelector(".technologyEdit .technologyEditWrapper .image img"),
        technologyEditContent = document.querySelector(".technologyEdit .technologyEditWrapper .content"),
        technologyEditCancelBtn = document.querySelector(".technologyEdit .technologyEditWrapper #cancel-btn i"),
        technologyEditFile = document.querySelector(".technologyEdit #technologyEditFile"),
        technologyEditChoose = document.querySelector(".technologyEdit #technologyEditChoose");

    function defaultEditActive() {
        defaultEdit ? defaultEdit.click() : null;
    }

    function defaultSkillEdit () {
        skillsEditFile ? skillsEditFile.click(): null;
    }

    function skillsAddActive () {
        skillsAddFile ? skillsAddFile.click() : null;
    }

    function technologyAdd () {
        technologyAddFile ? technologyAddFile.click(): null;
    }

    function technologyEdit () {
        technologyEditFile ? technologyEditFile.click(): null;
    }


    skillsAddChoose ? skillsAddChoose.addEventListener("click", skillsAddActive) : null;
    
    skillsEditChoose ? skillsEditChoose.addEventListener("click", defaultSkillEdit): null;

    technologyAddChoose ? technologyAddChoose.addEventListener("click", technologyAdd): null;

    technologyEditChoose ? technologyEditChoose.addEventListener("click", technologyEdit): null;

    skillsAddFile ? skillsAddFile.addEventListener("change", function () {
        const file = this.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = function () {
                const result = reader.result;
                skillsAddImg.src = result;
                skillsAddWrapper.classList.add("active");
                skillsAddContent.style.display = "none";
                skillsAddCancelBtn.style.display = "block";
            }
            skillsAddCancelBtn.addEventListener("click", function () {
                skillsAddImg.src = "";
                skillsAddWrapper.classList.remove("active");
                skillsAddContent.style.display = "flex"
                skillsAddCancelBtn.style.display = "none"
            })
            reader.readAsDataURL(file)
        }
    }) : null

    if (imgEdit) {
        if (imgEdit.src != "") {
            console.log("if 2");
            contentEdit.style.display = "none";
            aboutFonWrapper.classList.add("active");
            cancelBtnEdit.style.display = "block"
            cancelBtnEdit.addEventListener("click", function () {
                imgEdit.src = "";
                aboutFonWrapper.classList.remove("remove");
                contentEdit.style.display = "flex";
                cancelBtnEdit.style.display = "none"
            })
        }
    }

    defaultEdit ? defaultEdit.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                const result = reader.result;
                imgEdit.src = result;
                aboutFonWrapper.classList.add("active");
                contentEdit.style.display = "none";
                cancelBtnEdit.style.display = "block"
            }
            reader.readAsDataURL(file);
        }
    }) : null;

    if (skillsEditImg) {
        if (skillsEditImg.src != "") {
            console.log("if 2");
            skillsEditContent.style.display = "none";
            skillsEditWrapper.classList.add("active");
            skillsEditCancelBtn.style.display = "block"
            skillsEditCancelBtn.addEventListener("click", function () {
                skillsEditImg.src = "";
                skillsEditWrapper.classList.remove("remove");
                skillsEditContent.style.display = "flex";
                skillsEditCancelBtn.style.display = "none"
            })
        }
    }

    skillsEditFile ? skillsEditFile.addEventListener("change", function () {
        const file = this.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = function () {
                const result = reader.result;
                skillsEditImg.src = result;
                skillsEditWrapper.classList.add("active");
                skillsEditContent.style.display = "none";
                skillsEditCancelBtn.style.display = "block";
            }
            reader.readAsDataURL(file);
        }
    }): null;

    aboutEdit ? aboutEdit.addEventListener("click", defaultEditActive) : null

    

    function defaultFonActive() {
        defaultFon ? defaultFon.click() : null
    }




    customBtnFon ? customBtnFon.addEventListener("click", defaultFonActive) : null


    defaultFon ? defaultFon.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                const result = reader.result;
                imgFon.src = result;
                wrapperAboutFon.classList.add("active");
                contentFon.style.display = "none"
                cancelBtnFon.style.display = "block"
            }
            cancelBtnFon.addEventListener("click", function () {
                imgFon.src = "";
                wrapperAboutFon.classList.remove("active");
                contentFon.style.display = "flex"
                cancelBtnFon.style.display = "none"
            })
            reader.readAsDataURL(file);
        }
    }) : null

    technologyAddFile ? technologyAddFile.addEventListener("change", function () {
        const file = this.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = function () {
                const result = reader.result;
                technologyAddImg.src = result;
                technologyAddWrapper.classList.add("active");
                technologyAddContent.style.display = "none";
                technologyAddCancelBtn.style.display = "block";
            }
            technologyAddCancelBtn.addEventListener("click", function () {
                technologyAddImg.src = "";
                technologyAddWrapper.classList.remove("active");
                technologyAddContent.style.display = "flex"
                technologyAddCancelBtn.style.display = "none"
            })
            reader.readAsDataURL(file)
        }
    }) : null

    if (technologyEditImg) {
        if (technologyEditImg.src != "") {
            console.log("if 2");
            technologyEditContent.style.display = "none";
            technologyEditWrapper.classList.add("active");
            technologyEditCancelBtn.style.display = "block"
            technologyEditCancelBtn.addEventListener("click", function () {
                technologyEditImg.src = "";
                technologyEditWrapper.classList.remove("remove");
                technologyEditContent.style.display = "flex";
                technologyEditCancelBtn.style.display = "none"
            })
        }
    }

    technologyEditFile ? technologyEditFile.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                const result = reader.result;
                technologyEditImg.src = result;
                technologyEditWrapper.classList.add("active");
                technologyEditContent.style.display = "none";
                technologyEditCancelBtn.style.display = "block"
            }
            reader.readAsDataURL(file);
        }
    }) : null;
    
})