using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SeoFriendlySinglePageApp.Controllers
{
	public class ThingController : Controller
	{
		private List<Thing> _things = new List<Thing>
		{
			new Thing{Id= 1, Title = "Thing One", Detail = "Some things about thing one...."},
			new Thing{Id= 2, Title = "Thing Two", Detail = "Some things about thing two...."},
			new Thing{Id= 3, Title = "Thing Three", Detail = "Some things about thing three...."},
			new Thing{Id= 4, Title = "Thing Four", Detail = "Some things about thing four...."}
		};

		public ActionResult List()
		{
			//there are two ways of getting data, one from a browser requesting the page, 
			//and the second from our react control requesting data via ajax
			if (Request.IsAjaxRequest())
			{
				return Json(_things, JsonRequestBehavior.AllowGet);
			}
			else
			{
				return View(_things);
			}
		}

		public ActionResult Detail(int id)
		{
			var thing = _things.Single(t => t.Id == id);
			//there are two ways of getting data, one from a browser requesting the page, 
			//and the second from our react control requesting data via ajax
			if (Request.IsAjaxRequest())
			{
				return Json(thing, JsonRequestBehavior.AllowGet);
			}
			else
			{
				return View(thing);
			}
		}
	}

	public class Thing
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public string Detail { get; set; }
	}
}