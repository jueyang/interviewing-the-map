require 'crack'
require 'json'

hashFromXML = Hash.new
open("operatingreactors.xml", "r+") do |readf|
    hashFromXML = Crack::XML.parse(readf)
end

open( "operatingreactors.json", "w+" ) do |writef|
    writef.write(jsonFromHash)
end