function toggleDetailLevelContent(relativeCheckbox) {    
    const sectionName = relativeCheckbox.data("section");
    if (sectionName.length === 0) {
        return;
    }
    
    if (relativeCheckbox.is(":checked")) {
        $(`#${sectionName}-simple`).hide();
        $(`#${sectionName}-detailed`).show();
    } else {
        $(`#${sectionName}-simple`).show();
        $(`#${sectionName}-detailed`).hide();
    }
}

$(document).ready(() => {
    $(".switch input[type='checkbox']").each((_, relativeCheckbox) => {
        console.log(relativeCheckbox);
        
        toggleDetailLevelContent($(relativeCheckbox));
    });
});

// On click of the switch's checkbox, change shown version of text
$(".switch input[type='checkbox']").on("click", (e) => {
    const clickedCheckbox = $(e.currentTarget);
    toggleDetailLevelContent(clickedCheckbox);
});