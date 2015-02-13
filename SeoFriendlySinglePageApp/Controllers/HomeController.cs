using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SeoFriendlySinglePageApp.Controllers
{
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			//we always want to use the more interesting URLs
			return RedirectPermanent("/thing/list");
		}
	}
}