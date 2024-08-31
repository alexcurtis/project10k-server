import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CheckList } from "./checklist.model";
import { InputCheckListDto } from "./checklist.dto";
import { Account } from "src/account/account.model";

@Injectable()
export class CheckListService {
    constructor(
        @InjectModel(CheckList.name)
        private checkListModel: Model<CheckList>
    ) {}

    async findAllInAccount(accountId: string): Promise<CheckList[]> {
        return this.checkListModel.find({ account: accountId }).exec();
    }

    async findOne(id: string): Promise<CheckList> {
        return this.checkListModel.findById(id).exec();
    }

    async createOnAccount(checklist: InputCheckListDto, account: Account): Promise<CheckList> {
        const newCheckList = new this.checkListModel({
            ...checklist,
            account,
        });
        // If There Is A Parent - Append To Parent
        if (newCheckList.parent) {
            await this.addCheckListToParent(newCheckList);
        }
        return newCheckList.save();
    }

    async addCheckListToParent(checklist: CheckList) {
        return this.checkListModel
            .findByIdAndUpdate(
                checklist.parent,
                {
                    $push: {
                        children: checklist,
                    },
                },
                { new: true }
            )
            .exec();
    }

    async update(id: string, checklist: InputCheckListDto): Promise<CheckList> {
        return this.checkListModel.findByIdAndUpdate(id, checklist, { new: true }).exec();
    }

    async delete(id: string): Promise<CheckList> {
        return this.checkListModel.findByIdAndDelete(id).exec();
    }
}
