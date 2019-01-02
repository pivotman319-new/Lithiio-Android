var STRINGS = {
"en": {
	"OFFLINE": "You are offline. Uploads might not work.",
	"ONLINE": "L I T H I I O", // DO NOT TRANSLATE
	"CONFIRM_LOGOUT": "Are you SURE you want to logout? This will clear your upload history!",
	"RESET_ANALYTICS": "This will clear ALL LOCAL Analytics data from your device and reset your app-instance ID!, are you sure?",
	"RESET_ANALYTICS_DONE": "All local Analytics data has been deleted from your device and your app-instance ID has been reset.",
	"REQUEST_DATA_DELETION": "This will make a request to delete all analytics data about the app and you, are you sure?",
	"CLEAR_UPLOAD_HISTORY": "This will clear your upload history, are you sure?",
	"CLEAR_UPLOAD_HISTORY_DONE": "History cleared.",
	"SETTINGS_BUTTON": "Settings",
	"LOGOUT_BUTTON": "Logout",
	"CAMERA_QUALITY": "Camera quality",
	"SETTINGS_TITLE": "Settings",
	"ALLOW_EDIT": "Allow edit (camera)",
	"YES": "Yes",
	"NO": "No",
	"LOCAL_ANALYTICS_DATA": "Local Analytics Data",
	"RESET_LOCAL_ANALYTICS_BUTTON": "Reset",
	"REMOTE_ANALYTICS_DATA": "Remote Analytics Data",
	"RESET_REMOTE_ANALYTICS_BUTTON": "Request Deletion",
	"HISTORY": "History",
	"CLEAR_HISTORY_BUTTON": "Clear",
	"LANGUAGE": "Language",
	"THEME": "Theme",
	"DARK_THEME": "Dark"
	"LIGHT_THEME": "Light"
	},
"nl": {
	"OFFLINE": "Je bent offline. Uploads kunnen niet werken.",
	"ONLINE": "L I T H I I O", // DO NOT TRANSLATE
	"CONFIRM_LOGOUT": "Weet je het ZEKER dat je wilt uitloggen? Je upload geschiedenis wordt gewist!",
	"RESET_ANALYTICS": "Dit zal ALLE LOKALE analytics data van je apparaat wissen en je app-instance ID resetten, weet je het zeker?",
	"RESET_ANALYTICS_DONE": "Alle lokale analytics data is gewist van je apparaat en je app-instance ID is gereset.",
	"REQUEST_DATA_DELETION": "Dit zal een verzoek maken om alle analytics data over jij en de app te verwijderen, weet je het zeker?",
	"CLEAR_UPLOAD_HISTORY": "Dit zal je upload geschiedenis wissen, weet je het zeker?",
	"CLEAR_UPLOAD_HISTORY_DONE": "Geschiedenis gewist.",
	"SETTINGS_BUTTON": "Instellingen",
	"LOGOUT_BUTTON": "Uitloggen",
	"CAMERA_QUALITY": "Camera kwaliteit",
	"SETTINGS_TITLE": "Instellingen",
	"ALLOW_EDIT": "Bewerken toestaan (camera)",
	"YES": "Ja",
	"NO": "Nee",
	"LOCAL_ANALYTICS_DATA": "Lokale Analytics Data",
	"RESET_LOCAL_ANALYTICS_BUTTON": "Reset",
	"REMOTE_ANALYTICS_DATA": "Externe Analytics Data",
	"RESET_REMOTE_ANALYTICS_BUTTON": "Verzoek werwijdering",
	"HISTORY": "Geschiedenis",
	"CLEAR_HISTORY_BUTTON": "Wissen",
	"LANGUAGE": "Taal",
	"THEME": "Thema",
	"DARK_THEME": "Donker"
	"LIGHT_THEME": "Licht"
	}
}

var lang = localStorage.getItem("language");
var i10n_elements = document.getElementsByClassName("i10n"); // Every HTML element that should be translated
for(var i = 0; i < i10n_elements.length; i++) { // Loop through all the translatable elements
   i10n_elements[i].textContent = STRINGS[lang][i10n_elements[i].id] // Set the element to the relevant string for the relevant language
}