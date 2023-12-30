var form = document.getElementById("astro-form");
var date = document.getElementById("astro-date");
var output = document.getElementById("astro-output");

function zodiac(day, month) {
    // returns the zodiac sign according to day and month ( https://coursesweb.net/ )
    var zodiac = ['', 'Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];
    var last_day = ['', 19, 18, 20, 20, 21, 21, 22, 22, 21, 22, 21, 20, 19];
    return (day > last_day[month]) ? zodiac[month + 1] : zodiac[month];
}

form.addEventListener("submit", function (formSubmitEvent) {
    formSubmitEvent.preventDefault();
    console.log("what is form submit event?", formSubmitEvent);
    var dateValue = date.value;
    console.log("what is date value?", dateValue);
    var dateSplit = dateValue.split("-")
    var month = dateSplit[1] * 1;
    var day = dateSplit[2] * 1;
    var sign = Math.random() > 0.75 ? 'GummyBear' : zodiac(day, month);
    console.log("what is the sign?", sign);
    output.innerHTML = '<h1 id="' + sign + '">' + sign + '</h1>';
})

