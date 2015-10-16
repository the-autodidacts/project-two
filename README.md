# Project Two - Yoan

The app is a posting platform where users can create and edit articles. Other users can update the articles and a date with  the update and who the update was made by is recorded. Users can completely delete articles. The navigation is responsive and uses the Bootstrap framework to adjust for different screen sizes and to contain all the content. The content is contained inside Bootstrap panels and each entry is displayed in its own panel. 

Express Ejs Layouts where used to create a model a controller and a view. The express-session package was used to allow for plain text user login which allowed user login to persist for every route. I also used ejs to change the navabar from displaying a login form with a sign in button to a sign out button when user is logged in. 

Some technical challenges that I had include:
Could not get sessions to work at all until yesterday. Instead of asking for direct help I kept asking how session's work and it caused a lot of lost time. It turns out that I just had an issue where I was resseting the value of the session and locals variable everytime any route was hit. I thought I was just clearing req.session and that res.locals had req.session stored but when I cleared req.session I had it to where res.locals was also cleared. This caused enormous stress. 

Another technical issue I had was figuring out the direction of the routes. This was a problem that took several hours to figure out. I asked Finn for help and he was able to explain how routes where called differently from different parts of the same app. 

I did not add article categories. I did not have the time. I would have loved to do a lot more and feel that I could have if I would have figured out my session problem sooner. I also wanted to add a search feature that would at a minimum try to match some words in the article string but that did not happen either.

