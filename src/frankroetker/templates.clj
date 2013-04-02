(ns frankroetker.templates
  (:use [noir.core :only [defpartial]]
        [hiccup.page :only [include-css html5 include-js]]
        [hiccup.element :only [link-to]]
        [hiccup.util :only [to-str]]
        [markdown.core]))

(defn navbar [& page]
  [:div#navbar
   (link-to "http://frankroetker.com" "Home")
   [:span " ~ "]
   (link-to "http://monochromedream.com" "Monochrome Dream")
   [:span " ~ "]
   (link-to "http://github.com/dochaven" "Github")
   [:span " ~ "]
   (link-to "http://www.facebook.com/frank.roetker" "Facebook")])

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
                      (navbar)]
                   content]]
                [:footer
                 [:p 
                  "Created by "
                  (link-to "http://frankroetker.com/" "Frank Roetker")
                  "."]]]]))

(defpartial home [content]
  (base "Frank Roetker" content))
