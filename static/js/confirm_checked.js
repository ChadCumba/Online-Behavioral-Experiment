$(document).ready(function() {
    $('#continue-link').click(function() {
        if( $('#confirmed').attr('checked')){
            return true;
        }
        alert('You must agree to all terms to continue');
        return false;
     })
});
