(ns frankroetker.views.core
  (:require [frankroetker.templates :as t])
  (:use [noir.core :only [defpage]]
        [markdown.core]))

(defpage "/" []
         (t/home
           (md-to-html-string (slurp "resources/public/pages/home.md"))))

(defpage "/about" []
         (t/home
           (md-to-html-string (slurp "resources/public/pages/about.md"))))
