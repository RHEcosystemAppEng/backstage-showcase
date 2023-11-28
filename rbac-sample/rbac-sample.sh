export TOKEN='<JWT>'
export USER='user:default/sgahlot'
export ROLE='default/red_hat_appeng'
export PERMISSION="sysInfo"

# Get roles:
curl "http://localhost:7007/api/permission/roles" -H "Authorization: Bearer $TOKEN" | jq

# Get Policies:
curl http://localhost:7007/api/permission/policies -H "Authorization: Bearer $TOKEN" | jq

# List roles:
curl "http://localhost:7007/api/permission/roles?memberReferences='${USER}'" -H "Authorization: Bearer $TOKEN" | jq

# Create new role for the USER
curl -X POST "http://localhost:7007/api/permission/roles" \
    -d "{ \"memberReferences\": [ \"${USER}\" ], \"name\": \"role:${ROLE}\" }" \
    -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" | jq

# Verify role is created
curl "http://localhost:7007/api/permission/roles/role/$ROLE" -H "Authorization: Bearer $TOKEN" | jq

export SYS_INFO_PERMISSION="allow"
# Add the policy needed to use the custom plugin
curl -X POST "http://localhost:7007/api/permission/policies" \
    -d "{\"entityReference\": \"role:${ROLE}\", \"permission\": \"${PERMISSION}\", \"policy\": \"read\", \"effect\":\"${SYS_INFO_PERMISSION}\"}" \
    -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" | jq

# Verify the newly added policy
curl "http://localhost:7007/api/permission/policies/role/$ROLE" -H "Authorization: Bearer $TOKEN" | jq

# Get System Info
curl -X GET "http://localhost:7007/api/sys-info/system-info" \
    -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" | jq


export SYS_INFO_NEW_PERMISSION="deny"
# Update the newly policy to "deny" (from "allow")
curl -X PUT "http://localhost:7007/api/permission/policies/role/$ROLE" \
    -d "{\"entityReference\": \"role:${ROLE}\", \"oldPolicy\": {\"permission\": \"${PERMISSION}\", \"policy\": \"read\", \"effect\":\"${SYS_INFO_PERMISSION}\"}, \"newPolicy\": {\"permission\": \"${PERMISSION}\", \"policy\": \"read\", \"effect\":\"${SYS_INFO_NEW_PERMISSION}\"}}" \
    -H "Content-Type: application/json" -H "Authorization: Bearer $TOKEN" | jq

# Delete newly added policy
curl -X DELETE -G "http://localhost:7007/api/permission/policies/role/$ROLE" \
    -d permission='sysInfo' \
    -d policy='read' \
    -d effect='allow' \
    -H "Authorization: Bearer $TOKEN" | jq

# Delete newly created role
curl -X DELETE "http://localhost:7007/api/permission/roles/role/$ROLE" -H "Authorization: Bearer $TOKEN" | jq
