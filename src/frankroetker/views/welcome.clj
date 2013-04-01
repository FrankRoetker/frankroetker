(ns frankroetker.views.welcome
  (:require [frankroetker.views.common :as common]
            [noir.content.getting-started])
  (:use [noir.core :only [defpage]]))

(defpage "/welcome" []
         (common/layout
           [:p "Welcome to frankroetker"]))
