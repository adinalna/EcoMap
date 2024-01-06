package cbse.EcoMap.web;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;

@CrossOrigin(origins = "http://localhost:4200") // Change to Port 4200
@RestController
@RequestMapping("/api/i8n")

public class AboutPageController {
	
	@Autowired
    private MessageSource messageSource;

    @GetMapping("/localisation")
    public Map<String, String> getLocalization(@RequestHeader("Accept-Language") String acceptLanguage) {
        Map<String, String> localizationMap = new HashMap<>();
//        System.out.println("Accept-Language header: " + acceptLanguage); Debugging Line
        
     // Extract the preferred language from the Accept-Language header
        Locale locale = LocaleContextHolder.getLocale();
        if (acceptLanguage != null && !acceptLanguage.isEmpty()) {
        	locale = Locale.forLanguageTag(acceptLanguage.replace("_", "-"));
        }
        
     // Add all keys from the properties file to the map
        localizationMap.put("p1", messageSource.getMessage("p1", null, locale));
        localizationMap.put("p2", messageSource.getMessage("p2", null, locale));
        localizationMap.put("p3", messageSource.getMessage("p3", null, locale));
        localizationMap.put("p4", messageSource.getMessage("p4", null, locale));
        localizationMap.put("p5", messageSource.getMessage("p5", null, locale));
        localizationMap.put("li1", messageSource.getMessage("li1", null, locale));
        localizationMap.put("li2", messageSource.getMessage("li2", null, locale));
        localizationMap.put("li3", messageSource.getMessage("li3", null, locale));
        localizationMap.put("p6", messageSource.getMessage("p6", null, locale));
        localizationMap.put("p7", messageSource.getMessage("p7", null, locale));
        localizationMap.put("p8", messageSource.getMessage("p8", null, locale));

        return localizationMap;
    }

}
