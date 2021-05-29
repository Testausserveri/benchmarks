local s=0
local start = os.clock()

for a=1,65535 do
	for b=1,65535 do
        if a%b==0 then
            s=s+1
        end
	end
end

local stop = os.clock()
print(s)
print(tostring(stop-start) .. "s")
