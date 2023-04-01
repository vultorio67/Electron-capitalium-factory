
if (getCurrentView() == VIEWS.welcome)
{
for (const country of Object.keys(VIEWS)) {
  const view = VIEWS[country];
  console.log("oui")
  if(view != VIEWS.welcome)
  {
    console.log(view)
    $(view).hide();
  }
  
}
}
