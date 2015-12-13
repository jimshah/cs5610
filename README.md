This repository is made for the CS5610 Fall 15 class taken under Prof Jose.
The github repo will enable Professor and the TAs to view our codebase for the openshift site.

The OpenShift `nodejs` cartridge documentation can be found at:
http://openshift.github.io/documentation/oo_cartridge_guide.html#nodejs

PROJECT DOCUMENTATION : 

Following are a list of features project “Join Us” consists of : 
1) Join Us [ http://cs5610-shahjainam.rhcloud.com/project ] is a multi layered web app built on top of MEAN stack 
It is a common place for creating an event, viewing an event and registering for an event

2) Registration Features :
--A user is able to register for the site
--On registration, a welcome email gets sent to the user, as an acknowledgement 
--Any moment, user can log out, and re login using his/her credentials
--Only a logged-in user has access to certain parts of the app, discussed later on 

3) Non-Logged in user :
--browse list of events based on a certain category
--search for a particular user
--access searched user’s profile - only certain data
--search for event by typing in the keyword in the Header
--can see a list of attendees for a particular event
--The above viewing of the list enables the host to keep track of the attendees
--can view tags a particular event is associated with

4) Logged in user :
--all the features as for the non-logged in user has
--can enroll for an event thus becoming a host for an event
--can create a event by himself thus becoming a guest
--update the event details later on [which he/she has created]
--delete the event which he/she has created
--in the event creation page, a csv list of guests can be provided, an email invite gets sent through on successful creation of the event
--For the above email, the user can customize what message he wants in the email
--Follow a particular user
--After following a user, the logged in user can view the other user’s complete profile including email addresses
--The app uses cookies  to remember the logged in user.Hence, even on page refreshes, the user remains logged into the site until he logs out explicitly.

5) I have used an API supplied by eventful.com [http://api.eventful.com/docs]. Thanks to them.

6) I have created a proxy routes on the node server which provides a gateway for all of the api call eventful apis

7) The project also logs each of the incoming requests on the server’s console

8) The app is supposed to be responsive to the mobile and tablet screens using Bootstrap frequently


PS: The project proposal is on my drive that can be accessed via following link : 
https://drive.google.com/file/d/0Byy9IJuQnIsuM0U3RG84X3pvc0U/view?usp=sharing

