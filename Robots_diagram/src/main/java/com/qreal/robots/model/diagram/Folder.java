package com.qreal.robots.model.diagram;

import com.qreal.robots.model.auth.User;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

/**
 * Created by korniluk13 on 09.07.2015.
 */

@Entity
@Table(name = "folders")
public class Folder implements Serializable{

    @Id
    @Column(name = "folder_id")
    private String folderId;

    @Column(name = "folder_name")
    private String folderName;

    @Column(name = "folder_parent")
    private String folderParent;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "username", nullable = false)
    private User creator;

    public void setFolderId(String folderId) { this.folderId = folderId; }

    public String getFolderId() { return this.folderId; }

    public void setFolderName(String name) { this.folderName = name; }

    public String getFolderName() { return this.folderName; }

    public void setFolderParent(String folderParent) { this.folderParent = folderParent; }

    public String getFolderParent() { return this.folderParent; }

    public void setCreator(User creator) { this.creator = creator; }

    public User getCreator() { return this.creator; }
}
