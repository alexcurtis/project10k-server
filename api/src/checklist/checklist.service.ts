import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CheckList } from "./checklist.model";
import { InputCheckListDto } from "./checklist.dto";
import { Account } from "src/account/account.model";

@Injectable()
export class CheckListService {
    constructor(
        @InjectModel(CheckList.name)
        private checkListModel: Model<CheckList>
    ) {}

    async findAll(): Promise<CheckList[]> {
        return this.checkListModel.find().exec();
    }

    async findOne(id: string): Promise<CheckList> {
        return this.checkListModel.findById(id).exec();
    }

    async createOnAccount(checklist: InputCheckListDto, account: Account): Promise<CheckList> {
        const newCheckList = new this.checkListModel({
            ...checklist,
            account,
        });
        return newCheckList.save();
    }

    async update(id: string, checklist: InputCheckListDto): Promise<CheckList> {
        return this.checkListModel.findByIdAndUpdate(id, checklist, { new: true }).exec();
    }

    async delete(id: string): Promise<CheckList> {
        return this.checkListModel.findByIdAndDelete(id).exec();
    }
}
