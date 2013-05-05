(ns frankroetker.templates
  (:use [noir.core :only [defpartial]]
        [hiccup.page :only [include-css html5 include-js]]
        [hiccup.element :only [link-to]]
        [hiccup.util :only [to-str]]
        [markdown.core]))

;I don't really know what to do with my navbars:
(defn navbar [& page]
  [:div#navbar
   (link-to "http://frankroetker.com" "Home")
   [:span " ~ "]
   (link-to "http://monochromedream.com" "Monochrome Dream")
   [:span " ~ "]
   (link-to "http://github.com/dochaven" "Github")
   [:span " ~ "]
   (link-to "http://www.facebook.com/frank.roetker" "Facebook")])

(defn navbar2 [& page]
  [:div {:class "navbar navbar-inverse"}
   [:div {:class "navbar-inner"}
    [:div {:class "container"}
     [:a {:class "brand" :href "http://frankroetker.com"} "Home"]
     [:ul {:class "nav"}
      [:li (link-to "http://monochromedream.com" "Monochrome Dream")]
      [:li (link-to "http://github.com/dochaven" "Github")]
      [:li (link-to "http://www.facebook.com/frank.roetker" "Facebook")]]]]])

(defn footer []
  [:footer
   [:p 
    "Created by "
    (link-to "http://frankroetker.com/" "Frank Roetker")
    " in Clojure using the "
    (link-to "http://www.webnoir.org/" "Noir")
    " web framework."
    [:br]
    " The source for this website can be found on my "
    (link-to "http://github.com/dochaven/frankroetker" "Github")
    " page."]])

(defpartial base [title & content]
            (html5
              [:head
               [:title title]
               (include-css "/css/bootstrap.css")
               [:link {:rel "stylesheet/less" :type "text/css" :href "/css/style.less"}]
               (include-js "/js/less.js")]
              [:body {:class "chubs"}
               [:div#container
                [:div:contents
                  [:div#header
                   (link-to "http://frankroetker.com/"
                            [:img {:src "/img/header.png" :width "80" :alt "Frank Roetker"}])]
                  [:div#content
                     [:header
                      (navbar2)]
                   content]]
                (footer)]]))

(defpartial home [content]
  (base "Frank Roetker" content))

;Make a better 404 page sometime.
;Please excuse my terrible Ocarina of Time reference.
(defpartial page404 [content]
  (html5
    [:head
      [:title "404"]]
    [:body
      [:p
        [:pre
          [:center 
"
\"Oh, I'm sorry!

I got carried away with my story and
didn't even properly introduce myself

I am Zelda, Princess of Hyrule.

What is your name?

...

Zelda...

Strange... It sounds somehow...
familiar.\"

-Zelda, Ocarina of Time"]]]]))