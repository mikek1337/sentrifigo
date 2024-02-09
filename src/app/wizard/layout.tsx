import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { db } from "@/lib/db";
export default async function WizardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const wizardData = await db.main_wizard.findFirst({
        select:{
            manage_modules:true,
            departments:true,
            site_config:true,
            org_details:true,
            servicerequest:true,   
        }
    });
  const datasets = [
    {
      id: 1,
      name: "Modules",
      col:"manage_modules",
      description:
        "Enable the modules that are essential to your human resource process by selecting or deselecting them.",
      status: "Completed",
      image: "/manage_mod.png",
    },
    {
      id: 2,
      name: "Site Config",
      col:"site_config",
      description:
        "Configure the standards used in your organization by providing the site preferences.",
      status: "Completed",
      image: "/site_config.png",
    },
    {
      id: 3,
      name: "Organization",
      col:"org_details",
      description:
        "Provide your organization information to get your system up and running.",
      status: "Completed",
      image: "/orginz.png",
    },
    {
      id: 4,
      name: "Business Units",
      col:'team',
      description:
        "Configure business unit in your organization.",
      status: "Completed",
      image: "/bus_unit.png",
    },
    {
      id: 5,
      name: "Division",
      col:'team',
      description:
        "Configure Division in your organization.",
      status: "Completed",
      image: "/bus_unit.png",
    },
    {
      id: 6,
      name: "Departments",
      col:"departments",
      description:
        "Configure Departments in your organization.",
      status: "Completed",
      image: "/bus_unit.png",
    },
    {
      id: 7,
      name: "Section",
      col:'team',
      description:
        "Configure Section in your organization.",
      status: "Completed",
      image: "/bus_unit.png",
    },
    {
      id: 8,
      name: "Project",
      col:'team',
      description:
        "Configure Project in your organization.",
      status: "Completed",
      image: "/bus_unit.png",
    },
    {
      id: 9,
      name: "Team",
      description:
        "Configure Team in your organization.",
      col:'team',
      status: "Completed",
      image: "/bus_unit.png",
    },
    {
      id: 10,
      name: "Service Request",
      col:'service_request',
      description:
        "Configure service request settings used in your organization.",
      status: "Completed",
      image: "/service_req.png",
    },
  ];
  return (
    <div>
      <header className="max-w-full flex justify-between items-center m-6 gap-5">
        <div className="flex items-center justify-center gap-6">
          <Image
            src="/logo_wizard.png"
            alt="Wizard Logo"
            width={200}
            height={200}
          />
            <div className="max-w-[700px]">
            <p className="text-sm text-zinc-400">
                Configuration Wizard allows you to configure settings that reflect
                requirements unique to your organization and make your application
                ready to use.
            </p>
            </div>
        </div>
        <div>
          <Link
            href=""
            className={cn(buttonVariants({ variant: "default" }), "px-4")}
          >
            Back to site
          </Link>
        </div>
      </header>
      <div>
        <div className=" grid md:grid-cols-5">
          {datasets.map((data) => (
            <div key={data.id} className="max-w-[500px] border p-4 relative">
              <div className="flex justify-between items-center ">
                <div className="flex items-center gap-1">
                  <Image
                    src={data.image}
                    alt="Menu Module"
                    width={40}
                    height={40}
                  />
                  <h3 className="text-xs  text-zinc-600">{data.name}</h3>
                </div>
                <div>
                  {wizardData!=null && wizardData.departments?.valueOf}
                  <Icons.check className="text-green-400 text-xl"/>
                </div>
              </div>
              <div>
                <p className="text-xs my-2 text-zinc-400">
                    {data.description}
                </p>
              </div>
              <div className="w-full absolute bottom-0 flex justify-end items-center left-0">
                <span className="bg-green-600 text-white p-1 w-fit text-sm">
                  {data.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}
