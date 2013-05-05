(ns frankroetker.views.core
  (:require [frankroetker.templates :as t])
  (:use [noir.core :only [defpage]]
        [markdown.core]
        [clojure.java.io]))

(defpage "/:page" {:keys [page]}
  (let [f (str "./resources/public/pages/" page ".md")]
    (cond 
      (.exists (as-file f)) (t/home
                            (md-to-html-string (slurp f)))
      :else (t/page404 "404"))))

(defpage "/" []
         (t/home
           (md-to-html-string (slurp "resources/public/pages/home.md"))))