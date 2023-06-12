import { EntityDataModuleConfig, EntityMetadataMap } from "@ngrx/data";
import { Blog } from "../blogs/bogs.state";

const entityMetaData: EntityMetadataMap = {
  Blog: {
    "selectId": (x: Blog) => x._id,
  }
}

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata: entityMetaData
}