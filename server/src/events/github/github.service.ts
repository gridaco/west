import { Injectable } from "@nestjs/common";
import { PrismaService } from "services";
import {
  WebhookEvents,
  StarCreatedEvent,
  StarDeletedEvent,
  StarEvent,
  WatchEvent,
} from "@octokit/webhooks-types";

// remove * from WebhookEvents
type GHWebhookEvent = WebhookEvents[number];

@Injectable()
export class GithubWebhookService {
  constructor(private readonly prisma: PrismaService) {}

  event(type: GHWebhookEvent, payload: any) {
    //
    switch (type) {
      case "branch_protection_rule":
      case "check_run":
      case "check_suite":
      case "code_scanning_alert":
      case "commit_comment":
      case "create":
      case "delete":
      case "deploy_key":
      case "deployment":
      case "deployment_status":
      case "discussion":
      case "discussion_comment":
      case "fork":
      case "gollum":
      case "issue_comment":
      case "issues":
      case "label":
      case "member":
      case "membership":
      case "meta":
      case "milestone":
      case "org_block":
      case "organization":
      case "package":
      case "page_build":
      case "project":
      case "project_card":
      case "project_column":
      case "projects_v2_item":
      case "public":
      case "pull_request":
      case "pull_request_review":
      case "pull_request_review_comment":
      case "pull_request_review_thread":
      case "push":
      case "registry_package":
      case "release":
      case "repository":
      case "repository_import":
      case "repository_vulnerability_alert":
      case "secret_scanning_alert":
      case "secret_scanning_alert_location":
      case "security_and_analysis":
      case "star": {
        this._ev_star(payload as StarEvent);
        break;
      }
      case "status":
      case "team":
      case "team_add":
      case "watch":
      case "workflow_job":
      case "workflow_run":
      default:
        console.log("event", type, "not implemented");
        break;
    }
  }

  // star
  private _ev_star(event: StarEvent) {
    if (event.action === "created") {
      this._ev_star_created(event as StarCreatedEvent);
    } else if (event.action === "deleted") {
      this._ev_star_deleted(event as StarDeletedEvent);
    }
  }

  private _ev_star_created(event: StarCreatedEvent) {
    const { repository, sender, organization } = event;
    const repo_name = repository.full_name;
    const sender_name = sender.login;
    const org_name = organization?.login;

    console.log("star+", {
      repo_name,
      sender_name,
      org_name,
    });
    //
  }

  private _ev_star_deleted(event: StarDeletedEvent) {
    const { repository, sender, organization } = event;
    const repo_name = repository.full_name;
    const sender_name = sender.login;
    const org_name = organization?.login;

    console.log("star-", {
      repo_name,
      sender_name,
      org_name,
    });
  }

  // watch
  private _ev_watch(event: WatchEvent) {
    console.log("watch", event);
    //
  }
}
