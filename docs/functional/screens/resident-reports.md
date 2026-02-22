# Screen Spec: Resident Reports
Route: `/{locale}/dashboard/reports`

Actions:
- Create service request (report)

Offline:
- If offline, enqueue CreateServiceRequest with client-generated id.
- Attachments upload on reconnect first.
