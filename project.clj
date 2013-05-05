(defproject frankroetker "0.1.0-SNAPSHOT"
            :description "FIXME: write this!"
            :dependencies [[org.clojure/clojure "1.4.0"]
                           [noir "1.3.0-beta3"]
                           [markdown-clj "0.9.20"]]
            :plugins [[lein-ring "0.8.3"]]
            :main frankroetker.server
            :ring {:handler frankroetker.server/handler})

